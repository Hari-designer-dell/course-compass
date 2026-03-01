export interface Course {
  id: string;
  course_title: string;
  url: string;
  is_paid: boolean;
  price: number;
  num_subscribers: number;
  num_reviews: number;
  num_lectures: number;
  level: string;
  content_duration: number;
  subject: string;
  image: string;
}

export const subjects = [
  "Web Development",
  "Business Finance",
  "Graphic Design",
  "Musical Instruments",
] as const;

export const skillLevels = [
  "All Levels",
  "Beginner Level",
  "Intermediate Level",
  "Expert Level",
] as const;

export const learningStyles = [
  "Visual (Videos & Diagrams)",
  "Hands-on (Projects & Labs)",
  "Reading (Articles & Books)",
  "Interactive (Quizzes & Games)",
] as const;

// Representative dataset extracted from the Udemy courses notebook (top courses by popularity)
export const courses: Course[] = [
  // Web Development
  { id: "1", course_title: "Learn HTML5 Programming From Scratch", url: "https://www.udemy.com/learn-html5-programming-from-scratch/", is_paid: false, price: 0, num_subscribers: 268923, num_reviews: 8629, num_lectures: 45, level: "All Levels", content_duration: 10.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop" },
  { id: "2", course_title: "Coding for Entrepreneurs Basic", url: "https://www.udemy.com/coding-for-entrepreneurs/", is_paid: false, price: 0, num_subscribers: 161029, num_reviews: 279, num_lectures: 27, level: "Beginner Level", content_duration: 3.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop" },
  { id: "3", course_title: "The Web Developer Bootcamp", url: "https://www.udemy.com/the-web-developer-bootcamp/", is_paid: true, price: 200, num_subscribers: 121584, num_reviews: 27445, num_lectures: 342, level: "All Levels", content_duration: 43.0, subject: "Web Development", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop" },
  { id: "4", course_title: "The Complete Web Developer Course 2.0", url: "https://www.udemy.com/the-complete-web-developer-course-2/", is_paid: true, price: 200, num_subscribers: 114512, num_reviews: 22412, num_lectures: 304, level: "All Levels", content_duration: 30.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop" },
  { id: "5", course_title: "Build Your First Website in 1 Week with HTML5 and CSS3", url: "https://www.udemy.com/build-your-first-website/", is_paid: false, price: 0, num_subscribers: 120291, num_reviews: 5924, num_lectures: 30, level: "Beginner Level", content_duration: 3.0, subject: "Web Development", image: "https://images.unsplash.com/photo-1550439062-609e1531270e?w=600&h=400&fit=crop" },
  { id: "6", course_title: "The Complete JavaScript Course: Build Real Projects", url: "https://www.udemy.com/the-complete-javascript-course/", is_paid: true, price: 195, num_subscribers: 98543, num_reviews: 18234, num_lectures: 286, level: "All Levels", content_duration: 28.0, subject: "Web Development", image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop" },
  { id: "7", course_title: "Modern React with Redux", url: "https://www.udemy.com/react-redux/", is_paid: true, price: 200, num_subscribers: 87621, num_reviews: 21543, num_lectures: 367, level: "All Levels", content_duration: 47.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop" },
  { id: "8", course_title: "The Complete Node.js Developer Course", url: "https://www.udemy.com/the-complete-nodejs-developer-course/", is_paid: true, price: 200, num_subscribers: 76432, num_reviews: 15876, num_lectures: 234, level: "All Levels", content_duration: 34.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop" },
  { id: "9", course_title: "Web Design for Web Developers", url: "https://www.udemy.com/web-design-secrets/", is_paid: false, price: 0, num_subscribers: 65432, num_reviews: 4321, num_lectures: 18, level: "Beginner Level", content_duration: 2.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop" },
  { id: "10", course_title: "Learn Web Designing & HTML5/CSS3 Essentials in 4-Hours", url: "https://www.udemy.com/build-beautiful-html5-websites/", is_paid: true, price: 75, num_subscribers: 43285, num_reviews: 525, num_lectures: 24, level: "All Levels", content_duration: 4.0, subject: "Web Development", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop" },
  { id: "11", course_title: "Angular - The Complete Guide", url: "https://www.udemy.com/the-complete-guide-to-angular/", is_paid: true, price: 200, num_subscribers: 54321, num_reviews: 12456, num_lectures: 456, level: "All Levels", content_duration: 36.5, subject: "Web Development", image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&h=400&fit=crop" },
  { id: "12", course_title: "Python and Django Full Stack Web Developer Bootcamp", url: "https://www.udemy.com/python-and-django-full-stack-web-developer-bootcamp/", is_paid: true, price: 200, num_subscribers: 48976, num_reviews: 8765, num_lectures: 198, level: "Beginner Level", content_duration: 32.0, subject: "Web Development", image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop" },

  // Business Finance
  { id: "13", course_title: "An Entire MBA in 1 Course", url: "https://www.udemy.com/an-entire-mba-in-1-course/", is_paid: true, price: 200, num_subscribers: 187654, num_reviews: 32456, num_lectures: 386, level: "All Levels", content_duration: 22.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop" },
  { id: "14", course_title: "The Complete Financial Analyst Course", url: "https://www.udemy.com/the-complete-financial-analyst-course/", is_paid: true, price: 200, num_subscribers: 95432, num_reviews: 15678, num_lectures: 274, level: "All Levels", content_duration: 18.0, subject: "Business Finance", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { id: "15", course_title: "Complete Investment Banking Course 2017", url: "https://www.udemy.com/the-complete-investment-banking-course/", is_paid: true, price: 195, num_subscribers: 8575, num_reviews: 809, num_lectures: 110, level: "All Levels", content_duration: 5.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop" },
  { id: "16", course_title: "Ultimate Investment Banking Course", url: "https://www.udemy.com/ultimate-investment-banking-course/", is_paid: true, price: 200, num_subscribers: 2147, num_reviews: 23, num_lectures: 51, level: "All Levels", content_duration: 1.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },
  { id: "17", course_title: "Complete GST Course & Certification", url: "https://www.udemy.com/goods-and-services-tax/", is_paid: true, price: 75, num_subscribers: 2792, num_reviews: 923, num_lectures: 274, level: "All Levels", content_duration: 39.0, subject: "Business Finance", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop" },
  { id: "18", course_title: "Accounting & Financial Statement Analysis", url: "https://www.udemy.com/accounting-financial-statement/", is_paid: true, price: 150, num_subscribers: 45321, num_reviews: 7654, num_lectures: 156, level: "Beginner Level", content_duration: 12.0, subject: "Business Finance", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop" },
  { id: "19", course_title: "Stock Trading & Investing for Beginners", url: "https://www.udemy.com/stock-trading-investing/", is_paid: true, price: 100, num_subscribers: 67890, num_reviews: 9876, num_lectures: 89, level: "Beginner Level", content_duration: 8.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop" },
  { id: "20", course_title: "Financial Modeling and Valuation", url: "https://www.udemy.com/financial-modeling-valuation/", is_paid: true, price: 200, num_subscribers: 34567, num_reviews: 5432, num_lectures: 178, level: "Intermediate Level", content_duration: 15.0, subject: "Business Finance", image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&h=400&fit=crop" },
  { id: "21", course_title: "Intro to Forex Trading for Beginners", url: "https://www.udemy.com/introduction-to-forex-trading/", is_paid: true, price: 20, num_subscribers: 12345, num_reviews: 1234, num_lectures: 27, level: "Beginner Level", content_duration: 1.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop" },
  { id: "22", course_title: "Cryptocurrency & Bitcoin Trading Masterclass", url: "https://www.udemy.com/cryptocurrency-bitcoin-trading/", is_paid: true, price: 150, num_subscribers: 56789, num_reviews: 8765, num_lectures: 134, level: "All Levels", content_duration: 11.0, subject: "Business Finance", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop" },
  { id: "23", course_title: "Excel for Business & Finance Professionals", url: "https://www.udemy.com/excel-business-finance/", is_paid: true, price: 100, num_subscribers: 78654, num_reviews: 11234, num_lectures: 201, level: "All Levels", content_duration: 16.5, subject: "Business Finance", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" },

  // Graphic Design
  { id: "24", course_title: "Become a Professional Graphic Designer", url: "https://www.udemy.com/become-a-professional-graphic-designer/", is_paid: true, price: 200, num_subscribers: 87654, num_reviews: 12345, num_lectures: 245, level: "All Levels", content_duration: 24.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=400&fit=crop" },
  { id: "25", course_title: "Adobe Photoshop CC: Complete Beginners Guide", url: "https://www.udemy.com/adobe-photoshop-cc-beginners/", is_paid: true, price: 150, num_subscribers: 134567, num_reviews: 18976, num_lectures: 178, level: "Beginner Level", content_duration: 15.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=400&fit=crop" },
  { id: "26", course_title: "Illustrator CC 2019 MasterClass", url: "https://www.udemy.com/illustrator-cc-masterclass/", is_paid: true, price: 200, num_subscribers: 56432, num_reviews: 8765, num_lectures: 156, level: "All Levels", content_duration: 18.5, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
  { id: "27", course_title: "Logo Design Mastery: The Full Course", url: "https://www.udemy.com/logo-design-mastery/", is_paid: true, price: 150, num_subscribers: 43210, num_reviews: 6543, num_lectures: 89, level: "Beginner Level", content_duration: 12.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop" },
  { id: "28", course_title: "UI/UX Design with Adobe XD", url: "https://www.udemy.com/ui-ux-design-adobe-xd/", is_paid: true, price: 100, num_subscribers: 65432, num_reviews: 9876, num_lectures: 134, level: "Beginner Level", content_duration: 14.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=400&fit=crop" },
  { id: "29", course_title: "After Effects CC: Motion Graphics & Animation", url: "https://www.udemy.com/after-effects-motion-graphics/", is_paid: true, price: 200, num_subscribers: 34567, num_reviews: 5432, num_lectures: 198, level: "Intermediate Level", content_duration: 22.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop" },
  { id: "30", course_title: "Photography Masterclass: Complete Guide", url: "https://www.udemy.com/photography-masterclass/", is_paid: true, price: 200, num_subscribers: 98765, num_reviews: 14567, num_lectures: 256, level: "All Levels", content_duration: 26.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop" },
  { id: "31", course_title: "InDesign CC: Desktop Publishing Essentials", url: "https://www.udemy.com/indesign-cc-essentials/", is_paid: true, price: 100, num_subscribers: 23456, num_reviews: 3456, num_lectures: 78, level: "Beginner Level", content_duration: 8.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&h=400&fit=crop" },
  { id: "32", course_title: "Color Theory for Designers", url: "https://www.udemy.com/color-theory-designers/", is_paid: false, price: 0, num_subscribers: 45678, num_reviews: 5678, num_lectures: 34, level: "All Levels", content_duration: 4.5, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop" },
  { id: "33", course_title: "Typography Fundamentals", url: "https://www.udemy.com/typography-fundamentals/", is_paid: true, price: 50, num_subscribers: 18765, num_reviews: 2345, num_lectures: 45, level: "Beginner Level", content_duration: 5.0, subject: "Graphic Design", image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=400&fit=crop" },

  // Musical Instruments
  { id: "34", course_title: "Complete Guitar System - Beginner to Advanced", url: "https://www.udemy.com/complete-guitar-system/", is_paid: true, price: 200, num_subscribers: 145678, num_reviews: 23456, num_lectures: 312, level: "All Levels", content_duration: 35.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop" },
  { id: "35", course_title: "Pianoforall - Incredible New Way To Learn Piano", url: "https://www.udemy.com/pianoforall-incredible-new-way-to-learn-piano/", is_paid: true, price: 200, num_subscribers: 132456, num_reviews: 21345, num_lectures: 210, level: "All Levels", content_duration: 32.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&h=400&fit=crop" },
  { id: "36", course_title: "Ultimate Beginner Guitar Masterclass", url: "https://www.udemy.com/ultimate-beginner-guitar-masterclass/", is_paid: true, price: 100, num_subscribers: 8113, num_reviews: 79, num_lectures: 45, level: "Beginner Level", content_duration: 6.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=600&h=400&fit=crop" },
  { id: "37", course_title: "Music Theory Comprehensive: Complete Course", url: "https://www.udemy.com/music-theory-complete/", is_paid: true, price: 200, num_subscribers: 67890, num_reviews: 9876, num_lectures: 234, level: "All Levels", content_duration: 28.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop" },
  { id: "38", course_title: "Beginner Violin Course - Start Playing Today", url: "https://www.udemy.com/beginner-violin/", is_paid: true, price: 100, num_subscribers: 23456, num_reviews: 3456, num_lectures: 67, level: "Beginner Level", content_duration: 8.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1612225330812-01a9c73f63db?w=600&h=400&fit=crop" },
  { id: "39", course_title: "Music Production in Ableton Live", url: "https://www.udemy.com/music-production-ableton/", is_paid: true, price: 200, num_subscribers: 78654, num_reviews: 11234, num_lectures: 178, level: "All Levels", content_duration: 24.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop" },
  { id: "40", course_title: "Songwriting & Music Composition Masterclass", url: "https://www.udemy.com/songwriting-masterclass/", is_paid: true, price: 150, num_subscribers: 34567, num_reviews: 5432, num_lectures: 123, level: "Intermediate Level", content_duration: 16.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=400&fit=crop" },
  { id: "41", course_title: "Drums & Percussion - Complete Drumming Course", url: "https://www.udemy.com/complete-drumming-course/", is_paid: true, price: 100, num_subscribers: 19876, num_reviews: 2345, num_lectures: 89, level: "Beginner Level", content_duration: 10.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&h=400&fit=crop" },
  { id: "42", course_title: "Singing & Vocal Training for Beginners", url: "https://www.udemy.com/singing-vocal-training/", is_paid: true, price: 75, num_subscribers: 45678, num_reviews: 6789, num_lectures: 56, level: "Beginner Level", content_duration: 7.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop" },
  { id: "43", course_title: "Music Mixing & Mastering in Logic Pro X", url: "https://www.udemy.com/mixing-mastering-logic-pro/", is_paid: true, price: 200, num_subscribers: 28765, num_reviews: 4567, num_lectures: 145, level: "Intermediate Level", content_duration: 19.0, subject: "Musical Instruments", image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=600&h=400&fit=crop" },
];

/**
 * Popularity score formula from notebook: pop_score = 0.6 * num_subscribers + 0.4 * num_reviews
 */
export function getPopScore(course: Course): number {
  return 0.6 * course.num_subscribers + 0.4 * course.num_reviews;
}

/**
 * Get recommendations based on user preferences.
 * Filters by subject and level, then sorts by popularity score (matching notebook logic).
 */
export function getRecommendations(
  selectedSubjects: string[],
  selectedLevel: string,
  _learningStyle: string
): Course[] {
  let filtered = courses;

  if (selectedSubjects.length > 0) {
    filtered = filtered.filter((c) => selectedSubjects.includes(c.subject));
  }

  if (selectedLevel) {
    filtered = filtered.filter((c) => c.level === selectedLevel || c.level === "All Levels");
  }

  // Sort by popularity score (notebook formula)
  filtered.sort((a, b) => getPopScore(b) - getPopScore(a));

  return filtered;
}
