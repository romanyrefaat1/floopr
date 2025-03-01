type SignUpFormValues = {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};

export default async function createUserWithEmailAndPassword(
  data: SignUpFormValues
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_LINK}/api/auth/sign-up`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(`response from createuserwitemail and password`, response)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in createUserWithEmailAndPassword:", error);
    throw new Error("Response returned error.");
  }
}
