import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import FaqPage from '@/components/faq/FaqPage';

const Questions = () => {
  return (
    <DashboardLayout>
      <div className="pb-5">
        <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>
        <p className="text-muted-foreground">
          List of people in need of medical assistance
        </p>
      </div>
      <FaqPage />
    </DashboardLayout>
  );
};

export default Questions;