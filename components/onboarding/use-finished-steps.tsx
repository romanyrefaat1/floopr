"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import getAllComponentsByProductId from "@/actions/get-all-components-by-product-id";
import getUserProducts from "@/actions/user/get-user-products";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Step = 'create-product' | 'create-feedback' | 'create-widget' | 'embed-widget' | 'create-changelog' | 'setup-product-info';

export default function useFinishedSteps() {
    const { user, isLoaded } = useUser();
    const [steps, setSteps] = useState<Step[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [theProductIds, setTheProductIds] = useState<string[]>([]);
    const [isFinished, setIsFinished] = useState(false);

    const stepOrder: Step[] = [
        'create-product',
        'create-feedback', 
        'create-widget',
        'embed-widget',
        'create-changelog',
        'setup-product-info'
    ];

    useEffect(() => {
        const fetchSteps = async () => {
            if (!user?.id || !isLoaded) {
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                const userId = user.id;
                const collRef = collection(db, "products");
                const q = query(collRef, where("ownerId", "==", userId));
                const thisCount = await getCountFromServer(q);
                const productsCount = thisCount.data().count;
                
                // get products data for other steps
                const products = await getUserProducts(userId);
                console.log("useFinishedSteps products", products);
                
                const completedSteps: Step[] = [];

                // Step 1: Check if user has created products
                if (productsCount > 0) {
                    completedSteps.push('create-product');
                } else {
                    // If no products, no other steps can be completed
                    setSteps(completedSteps);
                    setIsLoading(false);
                    return;
                }

                // Step 2: Check for feedback
                const feedbackCount = products.reduce((acc, product) => acc + (product.feedbackCount || 0), 0);
                if (feedbackCount > 0) {
                    completedSteps.push('create-feedback');
                    
                    // Step 3: Check for widgets (only if feedback exists)
                    const productsIds = products.map(product => product.docId);
                    console.log("useFinishedSteps productsIds", productsIds)
                    setTheProductIds(productsIds);
                    const hasWidgets = (
                        await Promise.all(
                            productsIds.map(async (productId) => {
                                const widgets = await getAllComponentsByProductId(productId);
                                return widgets.length > 0;
                            })
                        )
                    ).some(Boolean);

                    if (hasWidgets) {
                        completedSteps.push('create-widget');
                        completedSteps.push('embed-widget');
                        
                        // Step 4: Check for changelogs (only if widgets exist)
                        let changelogsCount = 0;
                        await Promise.all(
                            productsIds.map(async (productId) => {
                                const collRef = collection(db, "products", productId, "updates");
                                const count = await getCountFromServer(collRef);
                                changelogsCount += count.data().count;
                            })
                        )
                        console.log("useFinishedSteps changelogsCount", changelogsCount)
                        const hasChangelogs = changelogsCount > 0;
                        console.log("useFinishedSteps hasChangelogs", hasChangelogs)

                        if (hasChangelogs) {
                            completedSteps.push('create-changelog');
                            
                            // Step 5: Check for product info (only if changelogs exist)
                            const hasProductInfo = products.some(
                                product => (product.productContext?.trim() || "").length > 0 && 
                                         (product.description?.trim() || "").length > 0
                            );

                            if (hasProductInfo) {
                                completedSteps.push('setup-product-info');
                            }
                        }
                    }
                }

                setSteps(completedSteps);
            } catch (err) {
                console.error('Error fetching onboarding steps:', err);
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        fetchSteps();
    }, [user?.id, isLoaded]);

    // Update isFinished and localStorage when steps change
    useEffect(() => {
        const newIsFinished = steps.length === stepOrder.length;
        setIsFinished(newIsFinished);
        
        // Update localStorage
        localStorage.setItem('onboarding-2-finished', JSON.stringify(newIsFinished));
        
        console.log("Steps updated:", steps);
        console.log("Is finished:", newIsFinished);
    }, [steps]);

    // Initialize from localStorage on mount
    useEffect(() => {
        const storedFinished = localStorage.getItem('onboarding-2-finished');
        if (storedFinished !== null) {
            const parsed = JSON.parse(storedFinished);
            setIsFinished(parsed);
            console.log("Initialized isFinished from localStorage:", parsed);
        }
    }, []);

    return { steps, isLoading, error, productIds: theProductIds, isFinished };
}