export const COLORS = {
  GRAY_1: 'rgb(20, 20, 20)',
  GRAY_2: 'rgb(30, 30, 30)',
  GRAY_3: 'rgb(50, 50, 50)',
  GRAY_4: 'rgb(65, 65, 65)',
  GRAY_5: 'rgb(80, 80, 80)',
  GRAY_6: 'rgb(95, 95, 95)',
  GRAY_7: 'rgb(110, 110, 110)',
  PRIMARY: 'purple'
};

export const DROPDOWN_GRADE_OPTIONS = [
  { key: 'A', text: 'A', value: 'A' },
  { key: 'A-', text: 'A-', value: 'A-' },
  { key: 'B+', text: 'B+', value: 'B+' },
  { key: 'B', text: 'B', value: 'B' },
  { key: 'B-', text: 'B-', value: 'B-' },
  { key: 'C+', text: 'C+', value: 'C+' },
  { key: 'C', text: 'C', value: 'C' },
  { key: 'C-', text: 'C-', value: 'C-' },
  { key: 'D+', text: 'D+', value: 'D+' },
  { key: 'D', text: 'D', value: 'D' },
  { key: 'D-', text: 'D-', value: 'D-' },
  { key: 'F', text: 'F', value: 'F' }
];

export const GPA_GRADE_WEIGHTS = {
  'A': 4,
  'A-': 3.75,
  'B+': 3.25,
  'B': 3,
  'B-': 2.75,
  'C+': 2.25,
  'C': 2,
  'C-': 1.75,
  'D+': 1.25,
  'D': 1,
  'D-': 0.75,
  'F': 0 
}

export const PLACEHOLDERS = {
  gradeInput: 'Grade',
  weightInput: 'Weight',
  gpaGradeInput: 'Grade',
  gpaCreditInput: 'Credits'
};

export const TAB_NAMES = {
  grade: 'Grade',
  gpa: 'GPA'
};

export const MESSAGES = {
  emptyInputError: "Make sure you've filled in all of the input boxes!"
}
