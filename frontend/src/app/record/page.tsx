'use client'
import { Header } from '@/components/organisms/header/page'
import { DateSelector } from '@/components/molecules/date-selector/page'
import { MealTypeSelector } from '@/components/molecules/meal-type-selector/page'

export default function RecordPage() {
  return (
    <>
      <div>
        <Header />
        <DateSelector />
        <MealTypeSelector />
      </div>
    </>
  );
}