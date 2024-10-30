"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { BasicInfoStep } from "@/components/onboarding/basic-info-step";
import { SkillsStep } from "@/components/onboarding/skills-step";
import { ExperienceStep } from "@/components/onboarding/experience-step";
import { PortfolioStep } from "@/components/onboarding/portfolio-step";
import { RatesStep } from "@/components/onboarding/rates-step";

const steps = [
  "Основная информация",
  "Профессиональные навыки",
  "Опыт работы",
  "Портфолио",
  "Тарифы"
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.push('/profile');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <SkillsStep />;
      case 2:
        return <ExperienceStep />;
      case 3:
        return <PortfolioStep />;
      case 4:
        return <RatesStep />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center">
            {steps[currentStep]}
          </h1>
          <Progress value={progress} className="w-full" />
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Назад
          </Button>
          <Button onClick={nextStep}>
            {currentStep === steps.length - 1 ? "Завершить" : "Далее"}
          </Button>
        </div>
      </div>
    </div>
  );
} 