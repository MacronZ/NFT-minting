import React from 'react';
import { BsPersonCheck } from 'react-icons/bs';
import { AiOutlineFileDone, AiOutlineFileSearch } from 'react-icons/ai';

export const onboardingSteps = [
  {
    label: 'Register',
    completed: true,
    icon: <BsPersonCheck />,
  },
  {
    label: 'Questionnaire',
    completed: true,
    link: '/questionnaire',
    icon: <AiOutlineFileSearch />,
  },
  {
    label: 'Documents',
    completed: true,
    link: '/documents',
    icon: <AiOutlineFileDone />,
  },
];
