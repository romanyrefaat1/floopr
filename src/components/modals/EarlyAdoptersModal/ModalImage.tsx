const ModalImage = () => {
  return (
    <div className="relative aspect-video lg:aspect-auto lg:h-full min-h-[200px] rounded-lg overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=800&h=600"
        alt="Focus and productivity concept"
        className="absolute inset-0 w-full h-full object-cover rounded-lg"
      />
    </div>
  )
}

export default ModalImage

