// Survey model for storing survey responses
export interface Survey {
  id: string;
  userId: string; // Link to the user who completed the survey
  completedAt: string;
  
  // Demographics & Admissions
  gender: string;
  transgender: string;
  orientation: string;
  ethnicity: string;
  age: string;
  recruitedAthlete: string;
  familyIncome: string;
  birthOrder: string;
  secondarySchool: string;
  legacy: string;
  firstGen: string;
  financialAid: string;
  gapYear: string;
  placeOfOrigin: string;
  communityType: string;
  topChoice: string;
  earlyAction: string;
  privateCounselor: string;
  
  // Politics & Beliefs
  religion: string;
  religiosity: string;
  politics: string;
  politicalParty: string;
  
  // Academics and Extracurriculars
  studyHours: string;
  mathLevel: string;
  highSchoolExtracurriculars: string[]; // List of activities
  stanfordExtracurriculars: string[]; // List of activities
  studentGovPresident: string;
  academicInterest: string;
  postGraduatePlans: string;
  
  // Lifestyle
  virgin: string;
  firstSexualActivity: string;
  sexualPartners: string;
  computer: string;
}

// For DynamoDB with AWS Amplify
export const schema = {
  name: "Survey",
  fields: {
    id: { type: "ID", isRequired: true },
    userId: { type: "ID", isRequired: true },
    completedAt: { type: "AWSDateTime", isRequired: true },
    
    // Demographics & Admissions
    gender: { type: "String", isRequired: true },
    transgender: { type: "String", isRequired: true },
    orientation: { type: "String", isRequired: true },
    ethnicity: { type: "String", isRequired: true },
    age: { type: "String", isRequired: true },
    recruitedAthlete: { type: "String", isRequired: true },
    familyIncome: { type: "String", isRequired: true },
    birthOrder: { type: "String", isRequired: true },
    secondarySchool: { type: "String", isRequired: true },
    legacy: { type: "String", isRequired: true },
    firstGen: { type: "String", isRequired: true },
    financialAid: { type: "String", isRequired: true },
    gapYear: { type: "String", isRequired: true },
    placeOfOrigin: { type: "String", isRequired: true },
    communityType: { type: "String", isRequired: true },
    topChoice: { type: "String", isRequired: true },
    earlyAction: { type: "String", isRequired: true },
    privateCounselor: { type: "String", isRequired: true },
    
    // Politics & Beliefs
    religion: { type: "String", isRequired: true },
    religiosity: { type: "String", isRequired: true },
    politics: { type: "String", isRequired: true },
    politicalParty: { type: "String", isRequired: true },
    
    // Academics and Extracurriculars
    studyHours: { type: "String", isRequired: true },
    mathLevel: { type: "String", isRequired: true },
    highSchoolExtracurriculars: { type: "List", ofType: "String", isRequired: true },
    stanfordExtracurriculars: { type: "List", ofType: "String", isRequired: true },
    studentGovPresident: { type: "String", isRequired: true },
    academicInterest: { type: "String", isRequired: true },
    postGraduatePlans: { type: "String", isRequired: true },
    
    // Lifestyle
    virgin: { type: "String", isRequired: true },
    firstSexualActivity: { type: "String", isRequired: true },
    sexualPartners: { type: "String", isRequired: true },
    computer: { type: "String", isRequired: true }
  },
  primaryKey: { name: "id", type: "String" },
  indexes: [
    { name: "byUser", fields: ["userId"] }
  ]
}; 