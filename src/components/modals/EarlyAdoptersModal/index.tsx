import ModalHeader from "./ModalHeader"
import ModalContent from "./ModalContent"
import ModalImage from "./ModalImage"

const EarlyAdoptersModal = () => {
  return (
    <div className="flex justify-center items-start bg-background p-4 sm:p-6 md:p-8 max-h-[90vh] max-w-[95vw] md:max-w-[90vw] lg:max-w-[1200px] overflow-y-auto">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        <div className="lg:w-2/3 order-2 lg:order-1">
          <ModalHeader />
          <ModalContent />
        </div>
        <div className="lg:w-1/3 order-1 lg:order-2">
          <ModalImage />
        </div>
      </div>
    </div>
  )
}

export default EarlyAdoptersModal

