// Constants for survey options
const genderOptions = ['Male', 'Female', 'Genderqueer/Non-binary', 'Other'];
const transgenderOptions = ['Identify as transgender', 'Do not identify as transgender'];
const orientationOptions = ['Heterosexual', 'Homosexual', 'Bisexual', 'Questioning', 'Other'];
const ethnicityOptions = [
  'White',
  'Black or African American',
  'Hispanic or Latino',
  'Asian',
  'American Indian or Alaska Native',
  'Native Hawaiian or Other Pacific Islander',
  'Two or more races',
  'Other'
];
const athleteOptions = ['Yes', 'No'];
const familyIncomeOptions = [
  'Less than $40,000',
  '$40,000 - $80,000',
  '$80,000 - $125,000',
  '$125,000 - $250,000',
  '$250,000 - $500,000',
  'More than $500,000',
  'Prefer not to say'
];
const birthOrderOptions = ['Only', 'Oldest', 'Middle', 'Youngest'];
const secondarySchoolOptions = [
  'Public (non-charter)',
  'Public (charter)',
  'Private (non-religious)',
  'Private (religious)',
  'Homeschooled',
  'Other'
];
const legacyOptions = [
  'None, or do not know of any',
  'Sibling(s)',
  'One parent',
  'Two parents',
  'One grandparent',
  'Multiple grandparents',
  'Aunt(s) and/or uncle(s)',
  'Other relative(s)'
];
const yesNoOptions = ['Yes', 'No'];
const placeOfOriginOptions = [
  'Northeast',
  'Southeast',
  'Midwest',
  'Southwest',
  'West',
  'U.S. Territories and Outlying Areas',
  'Outside of the United States'
];
const communityTypeOptions = ['Urban', 'Suburban', 'Rural'];
const religionOptions = [
  'Agnostic', 
  'Atheist', 
  'Buddhist', 
  'Catholic', 
  'Hindu', 
  'Jewish', 
  'Latter-Day Saint', 
  'Muslim', 
  'Protestant', 
  'Sikh', 
  'Other'
];
const religiosityOptions = [
  'Not at all religious', 
  'Not very religious', 
  'Somewhat religious', 
  'Very religious', 
  'Extremely religious'
];
const politicsOptions = [
  'Very progressive', 
  'Progressive', 
  'Moderate', 
  'Conservative', 
  'Very conservative', 
  'Apolitical'
];
const politicalPartyOptions = [
  'Democrat',
  'Republican',
  'Independent',
  'Libertarian',
  'Green',
  'I am not affiliated with a U.S. political party',
  'Other'
];
const studyHoursOptions = [
  '10 or fewer', 
  '11 to 19', 
  '20 to 29', 
  '30 to 39', 
  '40 to 49', 
  '50 or above'
];
const mathLevelOptions = [
  'Less than pre-calculus',
  'Pre-calculus',
  'AB Calculus',
  'BC Calculus',
  'Multivariable Calculus',
  'Linear Algebra',
  'Higher than Multivariable Calculus/Linear Algebra'
];
const highSchoolExtracurricularsOptions = [
  'Community Service',
  'Athletics',
  'Student Government',
  'Music Clubs/Bands/Orchestra',
  'Science Clubs/Competitions',
  'Cultural or Affinity Clubs',
  'Math Clubs/Competitions',
  'Debate',
  'Journalism',
  'Language Clubs',
  'Political Clubs',
  'Drama/Performing Art (Non-Music)',
  'Model UN',
  'Academic Quiz Bowl/Decathlon',
  'Visual Art',
  'Mock Trial',
  'Religious Clubs'
];
const stanfordExtracurricularsOptions = [
  'Varsity Athletics',
  'Club Sports',
  'Intramural Sports',
  'Greek Life',
  'Cultural/Ethnic Organizations',
  'Religious Organizations',
  'Community Service',
  'Political Organizations',
  'Publications/Media',
  'Theater/Performance',
  'Music Groups',
  'Dance Groups',
  'Academic/Professional Organizations',
  'Student Government',
  'Research',
  'Entrepreneurship',
  'Environmental Organizations',
  'Social Justice Organizations'
];
const academicInterestOptions = [
  'Arts and Humanities',
  'Social Sciences',
  'Sciences',
  'Engineering and Applied Sciences',
  'Unsure'
];
const postGraduatePlansOptions = [
  'Entrepreneurship',
  'Finance',
  'Arts/Sports/Entertainment',
  'Business',
  'Media/Publishing',
  'Consulting',
  'Government/Politics',
  'Academia',
  'Professional School (MBA, JD, MD, etc.)',
  'Technology',
  'Nonprofit/Public Service',
  'Engineering',
  'Health',
  'Education',
  'Other',
  'Unsure'
];
const virginOptions = ['Yes', 'No'];
const firstSexualActivityOptions = [
  'Middle school',
  '9th grade',
  '10th grade',
  '11th grade',
  '12th grade',
  'Summer after 12th grade',
  'Gap Year',
  'Freshman year of college',
  'Sophomore year of college',
  'Junior year of college',
  'Senior year of college',
  'Not applicable'
];
const sexualPartnersOptions = [
  '0',
  '1',
  '2-3',
  '4-6',
  '7-10',
  '11-15',
  'More than 15',
  'Prefer not to say'
];
const computerOptions = ['Mac', 'PC', 'Both', 'Other'];

// Helper functions for random data generation
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Generate a synthetic survey response
const generateSurveyResponse = () => {
  const age = getRandomInt(18, 25);
  
  // Random probability for virgin status based on age
  const isVirgin = age < 20 ? Math.random() < 0.4 : Math.random() < 0.2;
  const virginStatus = isVirgin ? 'Yes' : 'No';
  
  // Random probability for income and financial aid correlation
  const income = getRandomElement(familyIncomeOptions);
  let financialAid = getRandomElement(yesNoOptions);
  
  if (income === 'Less than $40,000' || income === '$40,000 - $80,000') {
    financialAid = Math.random() < 0.9 ? 'Yes' : 'No';
  } else if (income === 'More than $500,000') {
    financialAid = Math.random() < 0.2 ? 'Yes' : 'No';
  }
  
  // Random probability for politics correlation with religion
  const religion = getRandomElement(religionOptions);
  let politics = getRandomElement(politicsOptions);
  
  if (religion === 'Atheist' || religion === 'Agnostic') {
    politics = Math.random() < 0.7 ? 
      getRandomElement(['Very progressive', 'Progressive']) : 
      getRandomElement(['Moderate', 'Conservative', 'Very conservative', 'Apolitical']);
  }
  
  if (religion === 'Protestant' || religion === 'Catholic') {
    politics = Math.random() < 0.6 ? 
      getRandomElement(['Moderate', 'Conservative', 'Very conservative']) : 
      getRandomElement(['Very progressive', 'Progressive', 'Apolitical']);
  }
  
  return {
    // Demographics & Admissions
    gender: getRandomElement(genderOptions),
    transgender: getRandomElement(transgenderOptions),
    orientation: getRandomElement(orientationOptions),
    ethnicity: getRandomElement(ethnicityOptions),
    age: String(age),
    recruitedAthlete: getRandomElement(athleteOptions),
    familyIncome: income,
    birthOrder: getRandomElement(birthOrderOptions),
    secondarySchool: getRandomElement(secondarySchoolOptions),
    legacy: getRandomElement(legacyOptions),
    firstGen: getRandomElement(yesNoOptions),
    financialAid: financialAid,
    gapYear: getRandomElement(yesNoOptions),
    placeOfOrigin: getRandomElement(placeOfOriginOptions),
    communityType: getRandomElement(communityTypeOptions),
    topChoice: getRandomElement(yesNoOptions),
    earlyAction: getRandomElement(yesNoOptions),
    privateCounselor: getRandomElement(yesNoOptions),
    
    // Politics & Beliefs
    religion: religion,
    religiosity: getRandomElement(religiosityOptions),
    politics: politics,
    politicalParty: getRandomElement(politicalPartyOptions),
    
    // Academics and Extracurriculars
    studyHours: getRandomElement(studyHoursOptions),
    mathLevel: getRandomElement(mathLevelOptions),
    highSchoolExtracurriculars: getRandomElements(highSchoolExtracurricularsOptions, getRandomInt(1, 6)),
    stanfordExtracurriculars: getRandomElements(stanfordExtracurricularsOptions, getRandomInt(1, 5)),
    studentGovPresident: getRandomElement(yesNoOptions),
    academicInterest: getRandomElement(academicInterestOptions),
    postGraduatePlans: getRandomElement(postGraduatePlansOptions),
    
    // Lifestyle
    virgin: virginStatus,
    firstSexualActivity: getRandomElement(firstSexualActivityOptions),
    sexualPartners: getRandomElement(sexualPartnersOptions),
    computer: getRandomElement(computerOptions)
  };
};

// Generate 200 synthetic survey responses
const generateSyntheticData = (count: number = 200) => {
  return Array.from({ length: count }, generateSurveyResponse);
};

// Export the synthetic data
export const syntheticSurveyData = generateSyntheticData();

// Data analysis helper functions
export const getFieldCounts = (field: string) => {
  const counts: Record<string, number> = {};
  
  syntheticSurveyData.forEach((response: any) => {
    const value = response[field];
    
    if (Array.isArray(value)) {
      value.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    } else {
      counts[value] = (counts[value] || 0) + 1;
    }
  });
  
  return counts;
};

// Helper function to prepare chart data
export const prepareChartData = (field: string, chartType: 'bar' | 'pie' | 'doughnut') => {
  const counts = getFieldCounts(field);
  const labels = Object.keys(counts);
  const data = Object.values(counts);
  
  // Generate nice colors for the chart
  const backgroundColors = labels.map((_, i) => {
    return `hsl(${i * (360 / labels.length)}, 70%, 60%)`;
  });
  
  return {
    labels,
    datasets: [{
      label: field,
      data,
      backgroundColor: backgroundColors,
      borderWidth: 1
    }]
  };
}; 