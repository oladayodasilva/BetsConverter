export const metadata = {
    title: "Privacy Policy | BetsConverter",
    description: "BetsConverter privacy policy.",
  };
  
  export default function PrivacyPolicyPage() {
    return (
      <article className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
  
        <p className="mb-4 text-gray-700">
          BetsConverter may collect account information, saved calculations, AI chat
          history, and basic usage data to provide and improve the service.
        </p>
  
        <p className="mb-4 text-gray-700">
          We do not sell user passwords or sensitive account credentials. Passwords
          are stored securely using hashing.
        </p>
  
        <p className="text-gray-700">
          This page is a starter privacy policy and should be reviewed by a legal
          professional before commercial launch.
        </p>
      </article>
    );
  }