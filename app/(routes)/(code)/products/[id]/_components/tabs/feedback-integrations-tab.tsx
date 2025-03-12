import ComponentCard from "./component-card";
export default function FeedbackIntegrationsTab({ productData }: { productData }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <ComponentCard productData={productData} id="modal-time" />
            <ComponentCard productData={productData} id="modal-time" />
            <ComponentCard productData={productData} id="modal-time" />
        </div>
    )
}