export default async function createNewProduct(
  dataProps: object,
  ownerId: string
) {
  const data = { ...dataProps, ownerId: ownerId };

  try {
    const response = await fetch(`/api/new-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productData: data }),
    });

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error(error);
  }
}
