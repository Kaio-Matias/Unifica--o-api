import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export const Stepper = ({ currentStep, totalSteps }: StepperProps) => {
  return (
    <View style={styles.stepperContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isFuture = stepNumber > currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isCompleted && styles.stepCircleCompleted,
                  isCurrent && styles.stepCircleCurrent,
                  isFuture && styles.stepCircleFuture,
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      isCurrent && styles.stepNumberCurrent,
                      isFuture && styles.stepNumberFuture,
                    ]}
                  >
                    {stepNumber}
                  </Text>
                )}
              </View>
            </View>
            {stepNumber < totalSteps && (
              <View
                style={[
                  styles.stepLine,
                  stepNumber < currentStep && styles.stepLineCompleted,
                ]}
              />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCompleted: {
    backgroundColor: '#01AEA4',
  },
  stepCircleCurrent: {
    backgroundColor: '#4576F2',
  },
  stepCircleFuture: {
    backgroundColor: '#E5E5E5',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Intelo',
  },
  stepNumberCurrent: {
    color: '#FFFFFF',
  },
  stepNumberFuture: {
    color: '#999999',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 4,
  },
  stepLineCompleted: {
    backgroundColor: '#01AEA4',
  },
});
