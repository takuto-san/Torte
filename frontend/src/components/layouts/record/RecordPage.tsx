'use client'
import { Header } from '@/components/organisms/header/page'
import { DateSelector } from '@/components/molecules/date-selector/page'
import { MealTypeSelector } from '@/components/molecules/meal-type-selector/page'
import { InputForm } from '@/components/molecules/input-form/page'
import { TabNavigation } from '@/components/molecules/tab-navigation/page'

export const RecordPageLayout = () => {
  return (
    <>
      <div>
        <Header />
        <DateSelector />
        <MealTypeSelector />
        <InputForm />
        <TabNavigation />
      </div>
    </>
  );
}