import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Step3 = () => {
  const [selectedDate, setSelectedDate] = useState<number>(28);
  const [selectedTime, setSelectedTime] = useState<string>('08:30');
  const [currentMonth, setCurrentMonth] = useState<number>(3); // 0 = Janeiro, 3 = Abril
  const [currentYear, setCurrentYear] = useState<number>(2025);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30',
    '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarDay} />);
    }

    // Dias do mês - todos disponíveis
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = day === selectedDate;
      
      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.calendarDay,
            isSelected && styles.calendarDaySelected
          ]}
          onPress={() => setSelectedDate(day)}
        >
          <Text style={[
            styles.calendarDayText,
            isSelected && styles.calendarDayTextSelected
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <View style={styles.stepContent}>
      <View style={styles.card}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={handlePreviousMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-back" size={20} color="#1E2532" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>{monthNames[currentMonth]}, {currentYear}</Text>
            <TouchableOpacity onPress={handleNextMonth} style={styles.monthNavButton}>
              <Ionicons name="chevron-forward" size={20} color="#1E2532" />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {weekDays.map((day) => (
              <View key={day} style={styles.weekDay}>
                <Text style={styles.weekDayText}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
        </View>

        {/* Horários Disponíveis */}
        <View style={styles.timesContainer}>
          <View style={styles.timesHeader}>
            <Text style={styles.timesTitle}>Horários Disponíveis</Text>
            <Text style={styles.timesSubtitle}>Segunda, {selectedDate} de {monthNames[currentMonth]}</Text>
          </View>

          <View style={styles.timeGrid}>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.timeButtonSelected
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.timeTextSelected
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  calendarContainer: {
    marginBottom: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  monthNavButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  calendarDaySelected: {
    backgroundColor: '#4576F2',
    borderRadius: 20,
  },
  calendarDayText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo',
  },
  calendarDayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timesContainer: {
    marginTop: 0,
  },
  timesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo',
  },
  timesSubtitle: {
    fontSize: 12,
    color: '#6B7682',
    fontFamily: 'Intelo',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 75,
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#4576F2',
  },
  timeText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo',
  },
  timeTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
