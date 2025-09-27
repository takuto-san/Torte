'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/stores/store'
import { setCurrentTab } from '@/stores/tab/tabSlice'
import { TabContent } from '@/components/organisms/tab-content/page'
import { Header } from '@/components/organisms/header/page'
import { DateSelector } from '@/components/molecules/date-selector/page'
import { MealTypeSelector } from '@/components/molecules/meal-type-selector/page'
import { InputForm } from '@/components/molecules/input-form/page'
import { TabNavigation } from '@/components/molecules/tab-navigation/page'

export const RecordPageLayout = () => {
  const currentTabId = useSelector((state: RootState) => state.tab.currentTab);

  return (
    <div>
      <Header />
      <DateSelector />
      <MealTypeSelector />
      <InputForm />
      <TabNavigation />
      <TabContent id={currentTabId} />
    </div>
  );
};