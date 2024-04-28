import { Typography } from "@mui/material";

const problems = [
  {
    title: "Inefficiency",
    description:
      "The manual handling of documents leads to delays and inefficiencies in the document submission and verification process. Students are required to request physical copies of their transcripts from their educational institutions, which can take days or even weeks to process.",
  },
  {
    title: "Security Risks",
    description:
      "Traditional methods of document transmission, such as email or postal mail, pose significant security risks. Documents exchanged through these channels are susceptible to interception, tampering, or unauthorized access, compromising the integrity and confidentiality of sensitive information.",
  },
  {
    title: "Lack of Transparency",
    description:
      "The lack of a standardized, transparent verification process often leads to confusion and mistrust between students and educational institutions. Verifying the authenticity of academic credentials can be time-consuming and cumbersome, requiring manual verification steps that are prone to error.",
  },
  {
    title: "Data Privacy Concerns",
    description:
      "Students are rightfully concerned about the privacy and security of their personal data when sharing academic records with educational institutions or potential employers. The risk of data breaches and unauthorized access to sensitive information is a constant concern.",
  },
];

const solutions = [
  {
    title: "Decentralized Document Sharing",
    description:
      "With DocuChain, students can securely upload their academic records to the platform, eliminating the need for physical copies or insecure transmission methods. Our platform utilizes IPFS for decentralized storage, ensuring data redundancy and availability.",
  },
  {
    title: "Transparent Verification Process",
    description:
      "DocuChain provides a transparent and standardized verification process, enabling educational institutions and potential employers to easily verify the authenticity of academic credentials. Our platform records all document transactions on the blockchain, creating an immutable audit trail that enhances trust and transparency.",
  },
  {
    title: "Data Privacy and Confidentiality",
    description:
      "We prioritize the privacy and confidentiality of user data on DocuChain. Our platform utilizes advanced encryption techniques and decentralized storage to ensure that sensitive information remains protected from unauthorized access. It uses IExec DataProtector tool to secure the data of students and educational institutes.",
  },
  {
    title: "Streamlined Workflow",
    description:
      "By digitizing the document sharing and verification process, DocuChain eliminates administrative overhead and reduces processing times. Students can request, submit, and verify documents seamlessly through our user-friendly platform, saving time and effort for both students and educational institutions.",
  },
];

const Features = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-black pb-24 pt-56">
        <div className="md:w-1/2 mx-auto flex flex-col gap-16">
          <div className="text-white">
            <h1 className="text-gray-100 text-5xl text-center">
              Value Proposition
            </h1>

            <p className="mt-12 text-xl">
              In today's educational landscape,the process of sharing and
              verifying documents is plagued by numerous challenges. Students
              often encounter hurdles when they need to submit academic records
              or transcripts to educational institutions or potential employers.
              These challenges include:
            </p>

            <div>
              <ul className="flex flex-col gap-12 mt-10 mb-10">
                {problems.map((problem, index) => {
                  return (
                    <li key={index} className="flex flex-col gap-6">
                      <div className="flex gap-4">
                        <div className="rounded-full bg-primary py-1 px-3">
                          <h2 className="text-xl font-bold text-white inline">
                            {index + 1}
                          </h2>
                        </div>
                        <h2 className="text-3xl text-primary text-gray-100 font-bold">
                          {problem.title}
                        </h2>
                      </div>
                      <div>
                        <h3 className="text-gray-300 text-lg border-l-4 pl-8 py-4 border-primary">
                          {problem.description}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <p className="mt-12 text-xl">
              DocuChain offers a revolutionary solution to these challenges by
              leveraging blockchain technology and IPFS to create a secure,
              decentralized platform for document sharing and verification. It
              utilizes IExec’s DataProtector package to safeguard the sensitive
              data belonging to both students and educational institutes.
              <br /> <br />
              Our platform streamlines the entire process, providing the
              following benefits:
            </p>

            <div>
              <ul className="flex flex-col gap-12 mt-10 mb-10">
                {solutions.map((solution, index) => {
                  return (
                    <li key={index} className="flex flex-col gap-6">
                      <div className="flex gap-4">
                        <div className="rounded-full bg-primary py-1 px-3">
                          <h2 className="text-xl font-bold text-white inline">
                            {index + 1}
                          </h2>
                        </div>
                        <h2 className="text-3xl text-primary text-gray-100 font-bold">
                          {solution.title}
                        </h2>
                      </div>
                      <div>
                        <h3 className="text-gray-300 text-lg border-r-4 pr-8 py-4 border-primary">
                          {solution.description}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
