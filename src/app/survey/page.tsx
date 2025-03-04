'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type SectionType = 0 | 1 | 2 | 3;

interface SectionFields {
  0: string[];
  1: string[];
  2: string[];
  3: string[];
}

export default function Survey() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState<SectionType>(0);
  const [formData, setFormData] = useState({
    // Demographics & Admissions
    gender: '',
    transgender: '',
    orientation: '',
    ethnicity: '',
    age: '',
    recruitedAthlete: '',
    familyIncome: '',
    birthOrder: '',
    secondarySchool: '',
    legacy: '',
    firstGen: '',
    financialAid: '',
    gapYear: '',
    placeOfOrigin: '',
    communityType: '',
    topChoice: '',
    earlyAction: '',
    privateCounselor: '',
    
    // Politics & Beliefs
    religion: '',
    religiosity: '',
    politics: '',
    politicalParty: '',
    
    // Academics and Extracurriculars
    studyHours: '',
    mathLevel: '',
    highSchoolExtracurriculars: [] as string[],
    stanfordExtracurriculars: [] as string[],
    studentGovPresident: '',
    academicInterest: '',
    postGraduatePlans: '',
    
    // Lifestyle
    virgin: '',
    firstSexualActivity: '',
    sexualPartners: '',
    computer: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const newValue = checkbox.checked
        ? [...(formData[name as keyof typeof formData] as string[]), value]
        : (formData[name as keyof typeof formData] as string[]).filter(item => item !== value);
      
      setFormData(prev => ({
        ...prev,
        [name]: newValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const isCurrentSectionComplete = () => {
    console.log('Checking section completion for section:', currentSection);
    console.log('Current form data:', formData);
    
    try {
      switch (currentSection) {
        case 0: // Demographics & Admissions
          const demographicsComplete = 
            formData.gender !== '' &&
            formData.transgender !== '' &&
            formData.orientation !== '' &&
            formData.ethnicity !== '' &&
            formData.age !== '' &&
            formData.recruitedAthlete !== '' &&
            formData.familyIncome !== '' &&
            formData.birthOrder !== '' &&
            formData.secondarySchool !== '' &&
            formData.legacy !== '' &&
            formData.firstGen !== '' &&
            formData.financialAid !== '' &&
            formData.gapYear !== '' &&
            formData.placeOfOrigin !== '' &&
            formData.communityType !== '' &&
            formData.topChoice !== '' &&
            formData.earlyAction !== '' &&
            formData.privateCounselor !== '';
          console.log('Demographics fields complete:', demographicsComplete);
          return demographicsComplete;

        case 1: // Politics & Beliefs
          const politicsComplete = 
            formData.religion !== '' &&
            formData.religiosity !== '' &&
            formData.politics !== '' &&
            formData.politicalParty !== '';
          console.log('Politics fields complete:', politicsComplete);
          return politicsComplete;

        case 2: // Academics and Extracurriculars
          const academicsComplete = 
            formData.studyHours !== '' &&
            formData.mathLevel !== '' &&
            formData.highSchoolExtracurriculars.length > 0 &&
            formData.stanfordExtracurriculars.length > 0 &&
            formData.studentGovPresident !== '' &&
            formData.academicInterest !== '' &&
            formData.postGraduatePlans !== '';
          console.log('Academics fields complete:', academicsComplete);
          return academicsComplete;

        case 3: // Lifestyle
          const lifestyleComplete = 
            formData.virgin !== '' &&
            formData.firstSexualActivity !== '' &&
            formData.sexualPartners !== '' &&
            formData.computer !== '';
          console.log('Lifestyle fields complete:', lifestyleComplete);
          return lifestyleComplete;

        default:
          return false;
      }
    } catch (error) {
      console.error('Error in isCurrentSectionComplete:', error);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked');
    if (isCurrentSectionComplete()) {
      console.log('Submitting survey with data:', formData);
      router.push('/dashboard');
    }
  };

  const nextSection = () => {
    console.log('Next button clicked');
    console.log('Current section:', currentSection);
    const isComplete = isCurrentSectionComplete();
    console.log('Is section complete:', isComplete);
    
    if (isComplete && currentSection < sections.length - 1) {
      console.log('Moving to next section');
      setCurrentSection(prev => {
        const next = prev + 1;
        return next as SectionType;
      });
      window.scrollTo(0, 0);
    } else {
      console.log('Cannot move to next section. Complete:', isComplete, 'Current section:', currentSection);
    }
  };

  const prevSection = () => {
    setCurrentSection(prev => {
      const next = Math.max(0, prev - 1);
      return next as SectionType;
    });
    window.scrollTo(0, 0);
  };

  const sections = ['Demographics & Admissions', 'Politics & Beliefs', 'Academics and Extracurriculars', 'Lifestyle'] as const;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-8 text-cardinal-red">Survey</h1>
      
      <p className="text-center mb-8">
        Your statistics is collected anonymously. After you submit this survey, you will be able to see the overall statistics, and post new prompts to collect new statistics on topics you are interested in (for example, "are you a Taylor Swift fan?").
      </p>
      
      <div className="mb-8">
        <div className="flex justify-between mb-4 flex-wrap gap-2">
          {sections.map((section, index) => (
            <button
              key={section}
              disabled={index !== currentSection}
              className={`px-4 py-2 rounded-full ${
                index === currentSection
                  ? 'bg-cardinal-red text-white'
                  : index < currentSection
                  ? 'bg-green-500 text-white cursor-not-allowed'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {index + 1}. {section}
            </button>
          ))}
        </div>
        
        {/* Demographics & Admissions */}
        {currentSection === 0 as SectionType && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cardinal-red">Demographics & Admissions</h2>
            
            <form className="space-y-6">
              {/* Gender Identity */}
              <div>
                <label className="block text-lg font-medium mb-2">Gender Identity</label>
                <div className="space-y-2">
                  {['Male', 'Female', 'Genderqueer/Non-binary', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="gender" 
                        value={option} 
                        checked={formData.gender === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Transgender Identity */}
              <div>
                <label className="block text-lg font-medium mb-2">Transgender Identity</label>
                <div className="space-y-2">
                  {['Identify as transgender', 'Do not identify as transgender'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="transgender" 
                        value={option} 
                        checked={formData.transgender === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Sexual Orientation */}
              <div>
                <label className="block text-lg font-medium mb-2">Sexual Orientation</label>
                <div className="space-y-2">
                  {['Heterosexual', 'Homosexual', 'Bisexual', 'Questioning', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="orientation" 
                        value={option} 
                        checked={formData.orientation === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Ethnicity */}
              <div>
                <label className="block text-lg font-medium mb-2">Ethnicity</label>
                <select 
                  name="ethnicity"
                  value={formData.ethnicity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your ethnicity</option>
                  {[
                    'White',
                    'Black or African American',
                    'Hispanic or Latino',
                    'Asian',
                    'American Indian or Alaska Native',
                    'Native Hawaiian or Other Pacific Islander',
                    'Two or more races',
                    'Other'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Age */}
              <div>
                <label className="block text-lg font-medium mb-2">Age</label>
                <input 
                  type="number" 
                  name="age" 
                  value={formData.age}
                  onChange={handleInputChange}
                  min="16" 
                  max="100" 
                  className="w-full p-2 border rounded" 
                />
              </div>
              
              {/* Recruited Athlete */}
              <div>
                <label className="block text-lg font-medium mb-2">Recruited Athlete</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="recruitedAthlete" 
                        value={option} 
                        checked={formData.recruitedAthlete === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Family Income */}
              <div>
                <label className="block text-lg font-medium mb-2">Family Income</label>
                <select 
                  name="familyIncome"
                  value={formData.familyIncome}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your family income range</option>
                  {[
                    'Less than $40,000',
                    '$40,000 - $80,000',
                    '$80,000 - $125,000',
                    '$125,000 - $250,000',
                    '$250,000 - $500,000',
                    'More than $500,000',
                    'Prefer not to say'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Birth Order */}
              <div>
                <label className="block text-lg font-medium mb-2">Birth Order</label>
                <div className="space-y-2">
                  {['Only', 'Oldest', 'Middle', 'Youngest'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="birthOrder" 
                        value={option} 
                        checked={formData.birthOrder === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Secondary School */}
              <div>
                <label className="block text-lg font-medium mb-2">Secondary School</label>
                <div className="space-y-2">
                  {[
                    'Public (non-charter)',
                    'Public (charter)',
                    'Private (non-religious)',
                    'Private (religious)',
                    'Homeschooled',
                    'Other'
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="secondarySchool" 
                        value={option} 
                        checked={formData.secondarySchool === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Legacy */}
              <div>
                <label className="block text-lg font-medium mb-2">Legacy</label>
                <select 
                  name="legacy"
                  value={formData.legacy}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select legacy status</option>
                  {[
                    'None, or do not know of any',
                    'Sibling(s)',
                    'One parent',
                    'Two parents',
                    'One grandparent',
                    'Multiple grandparents',
                    'Aunt(s) and/or uncle(s)',
                    'Other relative(s)'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* First Gen */}
              <div>
                <label className="block text-lg font-medium mb-2">First Generation College Student</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="firstGen" 
                        value={option} 
                        checked={formData.firstGen === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Financial Aid */}
              <div>
                <label className="block text-lg font-medium mb-2">Receiving Financial Aid</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="financialAid" 
                        value={option}
                        checked={formData.financialAid === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Gap Year */}
              <div>
                <label className="block text-lg font-medium mb-2">Took a Gap Year</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="gapYear" 
                        value={option}
                        checked={formData.gapYear === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Place of Origin */}
              <div>
                <label className="block text-lg font-medium mb-2">Place of Origin</label>
                <select 
                  name="placeOfOrigin"
                  value={formData.placeOfOrigin}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your place of origin</option>
                  {[
                    'Northeast',
                    'Southeast',
                    'Midwest',
                    'Southwest',
                    'West',
                    'U.S. Territories and Outlying Areas',
                    'Outside of the United States'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Community Type */}
              <div>
                <label className="block text-lg font-medium mb-2">Community Type</label>
                <div className="space-y-2">
                  {['Urban', 'Suburban', 'Rural'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="communityType" 
                        value={option}
                        checked={formData.communityType === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Stanford Top Choice */}
              <div>
                <label className="block text-lg font-medium mb-2">Was Stanford your top choice?</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="topChoice" 
                        value={option}
                        checked={formData.topChoice === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Early Action */}
              <div>
                <label className="block text-lg font-medium mb-2">Applied Early Action</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="earlyAction" 
                        value={option}
                        checked={formData.earlyAction === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Private Admissions Counselor */}
              <div>
                <label className="block text-lg font-medium mb-2">Used Private Admissions Counselor</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="privateCounselor" 
                        value={option}
                        checked={formData.privateCounselor === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    isCurrentSectionComplete()
                      ? 'bg-cardinal-red hover:bg-cardinal-dark text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  Next Section
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Politics & Beliefs */}
        {currentSection === 1 as SectionType && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cardinal-red">Politics & Beliefs</h2>
            
            <form className="space-y-6">
              {/* Religion */}
              <div>
                <label className="block text-lg font-medium mb-2">Religion</label>
                <select 
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your religion</option>
                  {[
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
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Religiosity */}
              <div>
                <label className="block text-lg font-medium mb-2">Religiosity</label>
                <div className="space-y-2">
                  {[
                    'Not at all religious', 
                    'Not very religious', 
                    'Somewhat religious', 
                    'Very religious', 
                    'Extremely religious'
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="religiosity" 
                        value={option} 
                        checked={formData.religiosity === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Political Persuasion */}
              <div>
                <label className="block text-lg font-medium mb-2">Political Persuasion</label>
                <div className="space-y-2">
                  {[
                    'Very progressive', 
                    'Progressive', 
                    'Moderate', 
                    'Conservative', 
                    'Very conservative', 
                    'Apolitical'
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="politics" 
                        value={option} 
                        checked={formData.politics === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Political Party */}
              <div>
                <label className="block text-lg font-medium mb-2">Political Party</label>
                <select 
                  name="politicalParty"
                  value={formData.politicalParty}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your political party</option>
                  {[
                    'Democrat',
                    'Republican',
                    'Independent',
                    'Libertarian',
                    'Green',
                    'I am not affiliated with a U.S. political party',
                    'Other'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    currentSection > 0
                      ? 'bg-gray-500 hover:bg-gray-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={currentSection === 0 as SectionType}
                >
                  Previous Section
                </button>
                <button
                  type="button"
                  onClick={nextSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    isCurrentSectionComplete()
                      ? 'bg-cardinal-red hover:bg-cardinal-dark text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  Next Section
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Academics and Extracurriculars */}
        {currentSection === 2 as SectionType && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cardinal-red">Academics and Extracurriculars</h2>
            
            <form className="space-y-6">
              {/* Hours Spent Studying */}
              <div>
                <label className="block text-lg font-medium mb-2">Hours Spent Studying (per week)</label>
                <div className="space-y-2">
                  {[
                    '10 or fewer', 
                    '11 to 19', 
                    '20 to 29', 
                    '30 to 39', 
                    '40 to 49', 
                    '50 or above'
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="studyHours" 
                        value={option} 
                        checked={formData.studyHours === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Math Level pre-freshman year */}
              <div>
                <label className="block text-lg font-medium mb-2">Math Level pre-freshman year</label>
                <select 
                  name="mathLevel"
                  value={formData.mathLevel}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your highest math level</option>
                  {[
                    'Less than pre-calculus',
                    'Pre-calculus',
                    'AB Calculus',
                    'BC Calculus',
                    'Multivariable Calculus',
                    'Linear Algebra',
                    'Higher than Multivariable Calculus/Linear Algebra'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Extracurriculars in high school */}
              <div>
                <label className="block text-lg font-medium mb-2">Extracurriculars in high school (select all that apply)</label>
                <div className="space-y-2 grid grid-cols-1 md:grid-cols-2">
                  {[
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
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="highSchoolExtracurriculars" 
                        value={option} 
                        checked={formData.highSchoolExtracurriculars.includes(option)}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Extracurricular at Stanford */}
              <div>
                <label className="block text-lg font-medium mb-2">Extracurricular at Stanford (select all that apply)</label>
                <div className="space-y-2 grid grid-cols-1 md:grid-cols-2">
                  {[
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
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="stanfordExtracurriculars" 
                        value={option} 
                        checked={formData.stanfordExtracurriculars.includes(option)}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* President of Student Government in High school */}
              <div>
                <label className="block text-lg font-medium mb-2">Were you President of Student Government in High school?</label>
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="studentGovPresident" 
                        value={option} 
                        checked={formData.studentGovPresident === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Academic Interest at Stanford */}
              <div>
                <label className="block text-lg font-medium mb-2">Academic Interest at Stanford</label>
                <div className="space-y-2">
                  {[
                    'Arts and Humanities',
                    'Social Sciences',
                    'Sciences',
                    'Engineering and Applied Sciences',
                    'Unsure'
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="academicInterest" 
                        value={option} 
                        checked={formData.academicInterest === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Post-graduate plans */}
              <div>
                <label className="block text-lg font-medium mb-2">Post-graduate plans</label>
                <select 
                  name="postGraduatePlans"
                  value={formData.postGraduatePlans}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select your post-graduate plans</option>
                  {[
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
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    currentSection > 0
                      ? 'bg-gray-500 hover:bg-gray-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={currentSection === 0 as SectionType}
                >
                  Previous Section
                </button>
                <button
                  type="button"
                  onClick={nextSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    isCurrentSectionComplete()
                      ? 'bg-cardinal-red hover:bg-cardinal-dark text-white'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  Next Section
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Lifestyle */}
        {currentSection === 3 as SectionType && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-cardinal-red">Lifestyle</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Virgin Status */}
              <div>
                <label className="block text-lg font-medium mb-2">Sexual Experience</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="virgin" 
                      value="Yes" 
                      checked={formData.virgin === "Yes"}
                      onChange={handleInputChange}
                      className="mr-2" 
                    />
                    <span>Virgin</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="virgin" 
                      value="No" 
                      checked={formData.virgin === "No"}
                      onChange={handleInputChange}
                      className="mr-2" 
                    />
                    <span>Not a virgin</span>
                  </label>
                </div>
              </div>
              
              {/* Age of First Sexual Activity */}
              <div>
                <label className="block text-lg font-medium mb-2">Age of First Sexual Activity</label>
                <select 
                  name="firstSexualActivity"
                  value={formData.firstSexualActivity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select when you first became sexually active</option>
                  {[
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
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Number of Sexual Partners */}
              <div>
                <label className="block text-lg font-medium mb-2">Number of Sexual Partners</label>
                <select 
                  name="sexualPartners"
                  value={formData.sexualPartners}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select number of sexual partners</option>
                  {[
                    '0',
                    '1',
                    '2-3',
                    '4-6',
                    '7-10',
                    '11-15',
                    'More than 15',
                    'Prefer not to say'
                  ].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              {/* Mac/PC */}
              <div>
                <label className="block text-lg font-medium mb-2">Computer Preference</label>
                <div className="space-y-2">
                  {['Mac', 'PC', 'Both', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input 
                        type="radio" 
                        name="computer" 
                        value={option} 
                        checked={formData.computer === option}
                        onChange={handleInputChange}
                        className="mr-2" 
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevSection}
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    currentSection > 0
                      ? 'bg-gray-500 hover:bg-gray-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={currentSection === 0 as SectionType}
                >
                  Previous Section
                </button>
                <button
                  type="submit"
                  className={`font-bold py-2 px-6 rounded transition-colors duration-300 ${
                    isCurrentSectionComplete()
                      ? 'bg-cardinal-red hover:bg-cardinal-dark text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isCurrentSectionComplete()}
                >
                  Submit Survey
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 