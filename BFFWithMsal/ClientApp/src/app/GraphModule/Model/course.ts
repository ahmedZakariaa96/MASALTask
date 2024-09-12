export interface Course {
    id: string;
  displayName: string;
  description: string;
  term: string;
  teacher: string; 
  [key: string]: any
}
