import { cn } from "@/lib/utils";
import { FilterData, Product } from "../../page";
import AddFeedbackForm from "../add-simple-feedback-form";
import FeedbackMain from "../feedback-main";

export default function SimpleTemplate({ productData, filterData }: { productData: Product, filterData: FilterData }) {
    return (
        <main 
                className="max-w-7xl mx-auto px-4 sm:px-2 min-h-screen py-8"
                style={{
                    backgroundColor: "var(--background-color)",
                    color: "var(--text-color)",
                    fontFamily: "var(--font-family)",
                    fontSize: "var(--font-size)",
                }}
            >
                <div className="product-header mb-8 bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-md" style={{ 
                    boxShadow: "var(--shadow)",
                    borderRadius: "var(--border-radius)" 
                }}>
                    <div className={cn(
                        "grid gap-8",
                        productData.image ? "lg:grid-cols-2" : "lg:grid-cols-1"
                    )}>
                        {/* Left Side - Content */}
                        <div className="flex flex-col space-y-6">
                            <article className="flex flex-col space-y-4">
                                <h1 
                                    className="text-3xl lg:text-4xl" 
                                    style={{
                                        fontWeight: productData.style.headingStyle === "bold" ? "700" : 
                                                 productData.style.headingStyle === "light" ? "300" : "400",
                                        color: "var(--text-color)"
                                    }}
                                >
                                    {productData.name}
                                </h1>
                                
                                <p 
                                    className="text-lg"
                                    style={{color: "var(--secondary-text-color)"}}
                                >
                                    {productData.description.length > 0 ? productData.description : "No description available"}
                                </p>
                            </article>

                            <AddFeedbackForm
                                productId={productData.docId} 
                                className="w-full"
                                primaryColor={productData.style.primaryColor}
                                productName={productData.name} 
                            />
                        </div>

                        {/* Right Side - Image or Additional Content */}
                        {productData.image && (
                            <div 
                                className="hidden lg:flex items-center justify-center rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-video"
                                style={{ 
                                    borderRadius: "var(--border-radius)",
                                    boxShadow: "var(--shadow)",
                                }}
                            >
                                <div className="text-lg text-gray-500">Product Image</div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Feedback Section */}
                <div 
                    className="feedback-container bg-white/50 backdrop-blur-sm rounded-lg p-4 md:p-6"
                    style={{ 
                        boxShadow: "var(--shadow)",
                        borderRadius: "var(--border-radius)" 
                    }}
                >
                    <FeedbackMain filter={filterData} productData={productData} />
                </div>
            </main>
    )
}