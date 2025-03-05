import { doc } from "firebase/firestore";

export default async function POST(req: Request) {
  const { name } = await req.json();
  console.log(`name`, name);

  try {
    const docRef = doc(db, `products`, name);
    const docSnap = await getDo(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return NextResponse.json(
        { error: `Product name already exists.`, success: false },
        { status: 400 }
      );
    } else {
      console.log("No such document!");
      return NextResponse.json(
        { error: `Product name is available.`, success: true },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Server error in new-product route: ${error}`, success: false },
      { status: 500 }
    );
  }
}