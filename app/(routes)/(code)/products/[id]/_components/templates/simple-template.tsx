import { cn } from "@/lib/utils";
import { FilterData, Product } from "../../page";
import AddFeedbackForm from "../add-simple-feedback-form";
import FeedbackMain from "../feedback-main";
import Analysis from "./_components/analysis";

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
                <h1>{productData.docId}</h1>
                <Analysis />
                
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