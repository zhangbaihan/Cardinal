'use client';

import { useState } from 'react';
import Image from 'next/image';
import SurveyChart from '@/components/SurveyChart';
import '@/lib/chartConfig'; // Import chart configuration

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState('Demographics & Admissions');
  
  const categories = [
    'Demographics & Admissions',
    'Politics & Beliefs',
    'Academics and Extracurriculars',
    'Lifestyle'
  ];
  
  return (
    <div className="flex flex-col">
      {/* Stanford Picture */}
      <div className="w-full relative">
        <Image
          src="/stanford_colonnade.jpg"
          alt="Stanford Colonnade"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>
      
      {/* Dashboard Content */}
      <div className="flex flex-col md:flex-row mt-8">
        {/* Sticky Sidebar */}
        <div className="md:w-64 p-4 md:sticky md:top-20 self-start">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 font-medium ${
                    activeCategory === category
                      ? 'bg-cardinal-red text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Chart Content Area */}
        <div className="flex-1 p-4">
          {activeCategory === 'Demographics & Admissions' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-cardinal-red mb-6">Demographics & Admissions</h2>
              
              {/* Gender Distribution Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Gender Distribution</h3>
                <div className="h-64">
                  <SurveyChart title="Gender Distribution" dataField="gender" chartType="pie" />
                </div>
              </div>
              
              {/* Ethnicity Distribution Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Ethnicity Distribution</h3>
                <div className="h-64">
                  <SurveyChart title="Ethnicity Distribution" dataField="ethnicity" chartType="pie" />
                </div>
              </div>
              
              {/* Income Distribution Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Family Income Distribution</h3>
                <div className="h-64">
                  <SurveyChart title="Family Income Distribution" dataField="familyIncome" chartType="bar" />
                </div>
              </div>
              
              {/* Financial Aid Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Financial Aid Recipients</h3>
                <div className="h-64">
                  <SurveyChart title="Financial Aid Recipients" dataField="financialAid" chartType="doughnut" />
                </div>
              </div>
              
              {/* Legacy Status Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Legacy Status</h3>
                <div className="h-64">
                  <SurveyChart title="Legacy Status" dataField="legacy" chartType="bar" />
                </div>
              </div>
            </div>
          )}
          
          {activeCategory === 'Politics & Beliefs' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-cardinal-red mb-6">Politics & Beliefs</h2>
              
              {/* Political Views Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Political Views</h3>
                <div className="h-64">
                  <SurveyChart title="Political Views" dataField="politics" chartType="pie" />
                </div>
              </div>
              
              {/* Political Party Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Political Party Affiliation</h3>
                <div className="h-64">
                  <SurveyChart title="Political Party Affiliation" dataField="politicalParty" chartType="bar" />
                </div>
              </div>
              
              {/* Religious Affiliation Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Religious Affiliation</h3>
                <div className="h-64">
                  <SurveyChart title="Religious Affiliation" dataField="religion" chartType="bar" />
                </div>
              </div>
              
              {/* Religiosity Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Religiosity</h3>
                <div className="h-64">
                  <SurveyChart title="Religiosity" dataField="religiosity" chartType="pie" />
                </div>
              </div>
            </div>
          )}
          
          {activeCategory === 'Academics and Extracurriculars' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-cardinal-red mb-6">Academics and Extracurriculars</h2>
              
              {/* Study Hours Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Study Hours per Week</h3>
                <div className="h-64">
                  <SurveyChart title="Study Hours per Week" dataField="studyHours" chartType="bar" />
                </div>
              </div>
              
              {/* Math Level Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Math Level pre-freshman year</h3>
                <div className="h-64">
                  <SurveyChart title="Math Level pre-freshman year" dataField="mathLevel" chartType="bar" />
                </div>
              </div>
              
              {/* High School Extracurriculars Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">High School Extracurriculars</h3>
                <div className="h-64">
                  <SurveyChart title="High School Extracurriculars" dataField="highSchoolExtracurriculars" chartType="bar" />
                </div>
              </div>
              
              {/* Stanford Extracurriculars Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Stanford Extracurriculars</h3>
                <div className="h-64">
                  <SurveyChart title="Stanford Extracurriculars" dataField="stanfordExtracurriculars" chartType="bar" />
                </div>
              </div>
              
              {/* Academic Interest Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Academic Interest</h3>
                <div className="h-64">
                  <SurveyChart title="Academic Interest" dataField="academicInterest" chartType="pie" />
                </div>
              </div>
              
              {/* Post-Graduate Plans Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Post-Graduate Plans</h3>
                <div className="h-64">
                  <SurveyChart title="Post-Graduate Plans" dataField="postGraduatePlans" chartType="bar" />
                </div>
              </div>
            </div>
          )}
          
          {activeCategory === 'Lifestyle' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-cardinal-red mb-6">Lifestyle</h2>
              
              {/* Sexual Experience Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Sexual Experience</h3>
                <div className="h-64">
                  <SurveyChart title="Sexual Experience" dataField="virgin" chartType="pie" />
                </div>
              </div>
              
              {/* First Sexual Activity Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Age of First Sexual Activity</h3>
                <div className="h-64">
                  <SurveyChart title="Age of First Sexual Activity" dataField="firstSexualActivity" chartType="bar" />
                </div>
              </div>
              
              {/* Sexual Partners Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Number of Sexual Partners</h3>
                <div className="h-64">
                  <SurveyChart title="Number of Sexual Partners" dataField="sexualPartners" chartType="pie" />
                </div>
              </div>
              
              {/* Computer Preference Chart */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">Computer Preference</h3>
                <div className="h-64">
                  <SurveyChart title="Computer Preference" dataField="computer" chartType="doughnut" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 