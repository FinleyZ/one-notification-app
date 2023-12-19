export interface Message {
  id: string;
  email: string;
  to: string;
  subject: string;
  message: string;
  schedule: number;
}

// export interface Message {
//   id: string;
//   allDay: boolean;
//   color?: string;
//   description: string;
//   end: number;
//   start: number;
//   title: string;
// }

// export type View = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
