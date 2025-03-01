import myAuth from "@/lib/my-auth";

export default async function createNewProduct(data: object) {
  try {
    const {userId} = myAuth();
    // console.log(`userData`, user)
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_LINK}/api/new-product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productData: data, userId }),
      }
    );
    console.log(`createNewProduct response`, response)

    return response;
  } catch (error) {
    console.error(error);
  }
}
