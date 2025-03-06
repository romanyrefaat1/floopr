export default async function createNewProduct(data: object) {
  try {
    const response = await fetch(
      `/api/new-product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productData: data }),
      }
    );
    console.log(`createNewProduct response`, response);

    return response;
  } catch (error) {
    console.error(error);
  }
}
