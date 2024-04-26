export const steps = [
  {
    stepName: "Personal Information",
    inputs: [
      {
        question: "What is your name?",
        type: "text",
        tag: "fullName",
      },
      {
        question: "What is your email?",
        type: "email",
        tag: "email",
      },
    ],
  },
  {
    stepName: "Location Information",
    inputs: [
      {
        question: "Enter your gender",
        type: "select",
        options: [
          { value: "male", detail: "Male" },
          { value: "female", detail: "Female" },
        ],
        tag: "gender",
      },
      {
        question: "What is your DOB?",
        type: "date",
        tag: "dob",
      },
    ],
  },
  {
    stepName: "Educational Information",
    inputs: [
      {
        question: "What is your qualification?",
        type: "select",
        options: [
          { value: "graduation", detail: "Graduation" },
          { value: "post-graduation", detail: "Post Graduation" },
          { value: "phd", detail: "PhD" },
          { value: "high-school", detail: "High School (10th)" },
          { value: "intermediate", detail: "Intermediate (12th)" },
        ],
        tag: "qualification",
      },
      {
        question: "Select your degree type",
        type: "select",
        options: [
          { value: "btech", detail: "B.Tech(Bachelor of Technology)" },
          { value: "mtech", detail: "M.Tech(Master of Technology)" },
          { value: "mba", detail: "MBA(Master of Business Administration)" },
          { value: "bba", detail: "BBA(Bachelor of Business Administration)" },
          { value: "bca", detail: "BCA(Bachelor of Computer Applications)" },
          { value: "mca", detail: "MCA(Master of Computer Applications)" },
          { value: "bcom", detail: "B.Com(Bachelor of Commerce)" },
          { value: "mcom", detail: "M.Com(Master of Commerce)" },
          { value: "ba", detail: "BA(Bachelor of Arts)" },
          { value: "ma", detail: "MA(Master of Arts)" },
          { value: "bsc", detail: "B.Sc(Bachelor of Science)" },
          { value: "msc", detail: "M.Sc(Master of Science)" },
        ],
        tag: "degree",
      },
      {
        question: "Enter your university/school name",
        type: "text",
        tag: "university",
      },
      {
        question: "Duration of course",
        cols: [
          {
            type: "number",
            placeholder: "Start Year",
            tag: "startDate",
          },
          {
            type: "number",
            placeholder: "End Year",
            tag: "endDate",
          },
        ],
      },
      {
        cols: [
          {
            question: "Percentage",
            type: "number",
            placeholder: "percentage",
            tag: "percentage",
          },
          {
            question: "GPA",
            type: "number",
            placeholder: "GPA",
            tag: "gpa",
          },
        ],
      },
    ],
  },
];

export const stepValue = {
  fullName: "",
  email: "",
  gender: "male",
  dob: "",
  qualification: "graduation",
  degree: "btech",
  university: "",
  startDate: "",
  endDate: "",
  gpa: "",
  percentage: "",
};
