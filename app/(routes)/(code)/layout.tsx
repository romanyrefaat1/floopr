// app/[id]/layout.js
export default function PageLayout({ children, modal }) {
    return (
      <>
        <main>{children}</main>
        {/* Render modal content if available */}
        {modal}
      </>
    );
  }
  