import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfessionalProfileScreen() {
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState(28);
  const [currentMonth, setCurrentMonth] = useState(11); // 0-11 (Janeiro-Dezembro)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);

  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  
  const weekDaysNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  // Get days in month
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate days based on week offset
  const generateWeekDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const startOfWeek = 1 + (weekOffset * 7);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dayNumber = startOfWeek + i;
      if (dayNumber <= daysInMonth && dayNumber > 0) {
        const date = new Date(currentYear, currentMonth, dayNumber);
        const weekDay = weekDaysNames[date.getDay()];
        days.push({ day: dayNumber, weekDay });
      }
    }
    return days;
  };

  const handlePreviousWeek = () => {
    const newOffset = weekOffset - 1;
    const firstDay = 1 + (newOffset * 7);
    
    if (firstDay < 1) {
      // Go to previous month
      const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(newMonth, newYear);
      const weeksInPrevMonth = Math.ceil(daysInPrevMonth / 7);
      
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
      setWeekOffset(weeksInPrevMonth - 1);
    } else {
      setWeekOffset(newOffset);
    }
  };

  const handleNextWeek = () => {
    const newOffset = weekOffset + 1;
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const lastDay = 1 + (newOffset * 7) + 6;
    
    if (lastDay > daysInMonth && (1 + (newOffset * 7)) > daysInMonth) {
      // Go to next month
      const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
      setWeekOffset(0);
    } else {
      setWeekOffset(newOffset);
    }
  };

  // Mock data - in production, fetch based on id
  const professionalsData: Record<string, any> = {
    '1': {
      id: 1,
      name: "Dra. Maria Glendeswalter",
      username: "@dra.mariaglendeswalter",
      clinic: "Clínica Geral",
      types: ["Teleconsulta", "Presencial"],
      location: "Mangueirão, Belém - PA",
      address: "Av. Presidente Vargas, 85 - Mangueirão, Belém - PA",
      coordinates: { latitude: -1.4558, longitude: -48.4902 },
      price: 109.9,
      verified: true,
      rating: 4.8,
      totalAppointments: 5000,
      totalPatients: 1253,
      followers: "23k",
      description: "Clínica geral com 15 anos de experiência formada pela UNIFESP. Minha abordagem une medicina baseada em...",
      fullDescription: "Clínica geral com 15 anos de experiência formada pela UNIFESP. Minha abordagem une medicina baseada em evidências com cuidado humanizado, garantindo o melhor tratamento para cada paciente.",
      highlights: [
        { id: 1, image: "https://picsum.photos/200/300?random=1" },
        { id: 2, image: "https://picsum.photos/200/300?random=2" },
        { id: 3, image: "https://picsum.photos/200/300?random=3" },
        { id: 4, image: "https://picsum.photos/200/300?random=4" },
        { id: 5, image: "https://picsum.photos/200/300?random=5" },
      ],
      schedule: {
        times: ['08:00', '08:30', '09:00', '10:30', '14:00', '14:30', '15:00', '16:00']
      },
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Atendimento em Video Chamada', price: 49.90 },
        { id: 2, name: 'Consulta Presencial', description: 'Endereço', price: 99.90 },
        { id: 3, name: 'Retorno Presencial', description: 'Endereço', price: 50.90 },
      ],
      reviews: [
        { id: 1, author: 'Anônimo', date: 'Abril de 2025', rating: 5, comment: 'Realmente muito boa, médica super atenciosa e divertida de conversar. recomendo demais.' },
        { id: 2, author: 'Anônimo', date: 'Abril de 2025', rating: 5, comment: 'Amei a consulta, muito atenciosa e competente!' },
        { id: 3, author: 'João Silva', date: 'Março de 2025', rating: 4, comment: 'Ótimo atendimento, muito profissional.' },
      ],
      relatedProfessionals: [
        { id: 2, name: 'Dra. Maria Glenda', specialty: 'Clínica Geral', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=maria&backgroundColor=4576F2&size=200' },
        { id: 3, name: 'Dr. João Silva', specialty: 'Cardiologia', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=joao&backgroundColor=4576F2&size=200' },
        { id: 4, name: 'Dra. Ana Paula', specialty: 'Ginecologia', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=ana&backgroundColor=4576F2&size=200' },
      ]
    },
    '2': {
      id: 2,
      name: "Dra. Maria Glenda",
      username: "@dra.mariaglenda",
      clinic: "Clínica Geral",
      types: ["Teleconsulta", "Presencial"],
      location: "Mangueirão, Belém - PA",
      address: "Rua dos Mundurucus, 3200 - Mangueirão, Belém - PA",
      coordinates: { latitude: -1.4320, longitude: -48.4420 },
      price: 199.9,
      verified: true,
      rating: 4.9,
      totalAppointments: 2800,
      totalPatients: 1650,
      followers: "32k",
      description: "Médica clínica geral com vasta experiência em medicina preventiva e tratamento integrado...",
      fullDescription: "Médica clínica geral com vasta experiência em medicina preventiva e tratamento integrado. Formada pela UFPA com especialização em medicina de família.",
      highlights: [
        { id: 1, image: "https://picsum.photos/200/300?random=11" },
        { id: 2, image: "https://picsum.photos/200/300?random=12" },
        { id: 3, image: "https://picsum.photos/200/300?random=13" },
      ],
      schedule: {
        times: ['08:00', '09:30', '11:00', '14:00', '15:30', '17:00']
      },
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Consulta online via videochamada', price: 99.90 },
        { id: 2, name: 'Consulta Presencial', description: 'Atendimento no consultório', price: 199.90 },
        { id: 3, name: 'Check-up Completo', description: 'Avaliação médica completa', price: 350.00 },
      ],
      reviews: [
        { id: 1, author: 'Carlos Rodrigues', date: 'Novembro de 2025', rating: 5, comment: 'Excelente profissional, muito detalhista e atenciosa.' },
        { id: 2, author: 'Beatriz Santos', date: 'Outubro de 2025', rating: 5, comment: 'Super recomendo! Consulta completa e esclarecedora.' },
        { id: 3, author: 'Paulo Lima', date: 'Setembro de 2025', rating: 4, comment: 'Ótima médica, muito cuidadosa.' },
      ],
      relatedProfessionals: [
        { id: 1, name: 'Dra. Maria Glendeswalter', specialty: 'Clínica Geral', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=mariaglen&backgroundColor=4576F2&size=200' },
        { id: 3, name: 'Dr. João Silva', specialty: 'Cardiologia', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=joao&backgroundColor=4576F2&size=200' },
      ]
    },
    '3': {
      id: 3,
      name: "Dr. João Silva",
      username: "@dr.joaosilva",
      clinic: "Cardiologia Viva",
      types: ["Presencial"],
      location: "Centro, Ananindeua - PA",
      address: "Rua Principal, 123 - Centro, Ananindeua - PA",
      coordinates: { latitude: -1.3656, longitude: -48.3720 },
      price: 150,
      verified: false,
      rating: 4.5,
      totalAppointments: 1500,
      totalPatients: 890,
      followers: "15k",
      description: "Cardiologista com 10 anos de experiência em prevenção e tratamento cardiovascular...",
      fullDescription: "Especialista em cardiologia com foco em prevenção e tratamento de doenças cardiovasculares. Formado pela USP com residência no InCor.",
      highlights: [
        { id: 1, image: "https://picsum.photos/200/300?random=6" },
        { id: 2, image: "https://picsum.photos/200/300?random=7" },
      ],
      schedule: {
        times: ['09:00', '10:00', '14:00', '15:00', '16:00']
      },
      services: [
        { id: 1, name: 'Consulta Cardiológica', description: 'Consulta presencial completa', price: 150 },
        { id: 2, name: 'Eletrocardiograma', description: 'Exame de ECG', price: 80 },
        { id: 3, name: 'Ecocardiograma', description: 'Ultrassom do coração', price: 250 },
      ],
      reviews: [
        { id: 1, author: 'Pedro Santos', date: 'Março de 2025', rating: 5, comment: 'Excelente profissional!' },
        { id: 2, author: 'Maria Clara', date: 'Fevereiro de 2025', rating: 4, comment: 'Muito atencioso.' },
      ],
      relatedProfessionals: [
        { id: 1, name: 'Dra. Maria Glendeswalter', specialty: 'Clínica Geral', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=mariaglen&backgroundColor=4576F2&size=200' },
        { id: 5, name: 'Dr. Carlos Mendes', specialty: 'Cardiologia', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=carlos&backgroundColor=4576F2&size=200' },
      ]
    },
    '4': {
      id: 4,
      name: "Dra. Ana Paula",
      username: "@dra.anapaula",
      clinic: "Saúde da Mulher",
      types: ["Teleconsulta"],
      location: "Batista Campos, Belém - PA",
      address: "Av. Governador José Malcher, 456 - Batista Campos, Belém - PA",
      coordinates: { latitude: -1.4492, longitude: -48.4856 },
      price: 120.5,
      verified: true,
      rating: 4.9,
      totalAppointments: 3000,
      totalPatients: 1800,
      followers: "28k",
      description: "Ginecologista e obstetra especializada em saúde feminina integral...",
      fullDescription: "Especialista em ginecologia e obstetrícia com abordagem humanizada e acolhedora. Atendimento focado em saúde preventiva da mulher.",
      highlights: [
        { id: 1, image: "https://picsum.photos/200/300?random=8" },
        { id: 2, image: "https://picsum.photos/200/300?random=9" },
        { id: 3, image: "https://picsum.photos/200/300?random=10" },
      ],
      schedule: {
        times: ['08:00', '09:00', '10:00', '14:00', '15:00', '16:00']
      },
      services: [
        { id: 1, name: 'Teleconsulta', description: 'Consulta online', price: 120.5 },
        { id: 2, name: 'Consulta Ginecológica', description: 'Consulta presencial', price: 150 },
        { id: 3, name: 'Pré-natal', description: 'Acompanhamento gestacional', price: 180 },
      ],
      reviews: [
        { id: 1, author: 'Juliana Costa', date: 'Maio de 2025', rating: 5, comment: 'Melhor médica que já consultei!' },
        { id: 2, author: 'Carla Souza', date: 'Abril de 2025', rating: 5, comment: 'Super atenciosa e competente.' },
      ],
      relatedProfessionals: [
        { id: 1, name: 'Dra. Maria Glendeswalter', specialty: 'Clínica Geral', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=mariaglen&backgroundColor=4576F2&size=200' },
        { id: 6, name: 'Dra. Fernanda Costa', specialty: 'Pediatria', image: 'https://api.dicebear.com/7.x/avataaars/png?seed=fernanda&backgroundColor=4576F2&size=200' },
      ]
    },
  };

  const professional = professionalsData[id as string] || professionalsData['1'];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1E2532" />
          </Pressable>
          <Text style={styles.headerTitle}>{professional.username}</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.iconButton}>
            <Ionicons name="bookmark-outline" size={24} color="#4576F2" />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#1E2532" />
          </Pressable>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* White background extension */}
        <View style={styles.headerExtension} />
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: `https://api.dicebear.com/7.x/avataaars/png?seed=${encodeURIComponent(professional.name.replace(/\s+/g, '').toLowerCase())}&backgroundColor=4576F2&size=200` }} 
            style={styles.profileImage}
          />
          
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{professional.name}</Text>
            {professional.verified && (
              <Ionicons name="checkmark-circle" size={24} color="#01AEA4" style={{ marginLeft: 6 }} />
            )}
          </View>

          <View style={styles.clinicBadge}>
            <Ionicons name="medkit" size={16} color="#FFFFFF" />
            <Text style={styles.clinicText}>{professional.clinic}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Pressable style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Ver Perfil</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Compartilhar</Text>
            </Pressable>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Atendimentos</Text>
              <Text style={styles.statValue}>{professional.totalAppointments.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Pacientes</Text>
              <Text style={styles.statValue}>{professional.totalPatients.toLocaleString()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Seguidores</Text>
              <Text style={styles.statValue}>{professional.followers}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionSection}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <Text style={styles.descriptionText}>
              {professional.fullDescription}{' '}
              <Text style={styles.seeMore}>Ver mais</Text>
            </Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={16} color="#1E2532" />
              <Text style={styles.locationText}>{professional.location}</Text>
            </View>
          </View>

          {/* Highlights */}
          <View style={styles.highlightsSection}>
            <Text style={styles.highlightsTitle}>Destaques</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.highlightsScroll}
            >
              {professional.highlights.map((highlight: any) => (
                <Pressable key={highlight.id} style={styles.highlightItem}>
                  <Image 
                    source={{ uri: highlight.image }} 
                    style={styles.highlightImage}
                  />
                </Pressable>
              ))}
            </ScrollView>
            <Pressable style={styles.seeMoreContainer}>
              <Text style={styles.seeMoreLink}>Ver destaques</Text>
            </Pressable>
          </View>

          {/* Horário de Atendimento */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Horário de Atendimento</Text>
            
            {/* Month Navigator */}
            <View style={styles.monthNavigator}>
              <Pressable onPress={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11);
                  setCurrentYear(currentYear - 1);
                } else {
                  setCurrentMonth(currentMonth - 1);
                }
                setWeekOffset(0);
              }} style={styles.monthArrow}>
                <Ionicons name="chevron-back" size={20} color="#4576F2" />
              </Pressable>
              <Text style={styles.monthText}>{monthNames[currentMonth]}</Text>
              <Pressable onPress={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0);
                  setCurrentYear(currentYear + 1);
                } else {
                  setCurrentMonth(currentMonth + 1);
                }
                setWeekOffset(0);
              }} style={styles.monthArrow}>
                <Ionicons name="chevron-forward" size={20} color="#4576F2" />
              </Pressable>
            </View>

            {/* Days Selector */}
            <View style={styles.daysContainer}>
              <Pressable onPress={handlePreviousWeek} style={styles.arrowButton}>
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </Pressable>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daysScroll}>
                {generateWeekDays().map((date) => (
                  <Pressable
                    key={date.day}
                    style={[
                      styles.dayButton,
                      selectedDate === date.day && styles.dayButtonActive
                    ]}
                    onPress={() => setSelectedDate(date.day)}
                  >
                    <Text style={[styles.weekDayText, selectedDate === date.day && styles.weekDayTextActive]}>
                      {date.weekDay}
                    </Text>
                    <Text style={[styles.dayText, selectedDate === date.day && styles.dayTextActive]}>
                      {date.day}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable onPress={handleNextWeek} style={styles.arrowButton}>
                <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
              </Pressable>
            </View>

            {/* Time Slots */}
            <View style={styles.timeSlotsContainer}>
              {professional.schedule.times.map((time: string, index: number) => (
                <Pressable 
                  key={`${time}-${index}`} 
                  style={[
                    styles.timeSlot,
                    selectedTime === `${time}-${index}` && styles.timeSlotSelected
                  ]}
                  onPress={() => setSelectedTime(`${time}-${index}`)}
                >
                  <Text style={[
                    styles.timeSlotText,
                    selectedTime === `${time}-${index}` && styles.timeSlotTextSelected
                  ]}>{time}</Text>
                </Pressable>
              ))}
            </View>

            <Pressable 
              style={styles.viewAllButton}
              onPress={() => {
                const params: any = { professionalId: id };
                if (selectedService) params.serviceId = selectedService;
                const queryString = new URLSearchParams(params).toString();
                router.push(`/minha-saude/agendamento/${id}?${queryString}&startStep=3` as any);
              }}
            >
              <Text style={styles.viewAllButtonText}>Ver todos os Horários</Text>
            </Pressable>
          </View>

          {/* Serviços Ofertados */}
          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Serviços Ofertados</Text>
            <Text style={styles.servicesSubtitle}>A Dra. Maria Glenda oferece os seguintes atendimentos:</Text>
            
            {professional.services.map((service: any) => (
              <Pressable 
                key={service.id} 
                style={[
                  styles.serviceCard,
                  selectedService === service.id && styles.serviceCardSelected
                ]}
                onPress={() => setSelectedService(service.id)}
              >
                <View style={styles.serviceInfo}>
                  <View style={styles.serviceHeader}>
                    <View style={[
                      styles.radioButton,
                      selectedService === service.id && styles.radioButtonSelected
                    ]}>
                      {selectedService === service.id && (
                        <View style={styles.radioButtonInner} />
                      )}
                    </View>
                    <Text style={styles.serviceName}>{service.name}</Text>
                  </View>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <Text style={styles.servicePrice}>R$ {service.price.toFixed(2)}</Text>
              </Pressable>
            ))}

            <Pressable 
              style={styles.viewAllButton}
              onPress={() => router.push(`/minha-saude/agendamento/${id}` as any)}
            >
              <Text style={styles.viewAllButtonText}>Ver todos os Atendimentos</Text>
            </Pressable>
          </View>

          {/* Avaliações */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.ratingText}>{professional.rating}</Text>
              </View>
              <Text style={styles.totalReviews}>{professional.totalAppointments.toLocaleString()} Avaliações</Text>
            </View>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.reviewsScroll}
            >
              {professional.reviews.map((review: any) => (
                <View key={review.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{review.author}</Text>
                    <View style={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons 
                          key={i} 
                          name={i < review.rating ? "star" : "star-outline"} 
                          size={14} 
                          color="#FFD700" 
                        />
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </ScrollView>

            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Ver todas as Avaliações</Text>
            </Pressable>
          </View>

          {/* Profissionais */}
          <View style={styles.professionalsSection}>
            <Text style={styles.sectionTitle}>Profissionais</Text>
            <Text style={styles.professionalsSubtitle}>
              Profissionais oferecem seus atendimentos nessa instituição:
            </Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.professionalsScroll}
            >
              {professional.relatedProfessionals.map((prof: any) => (
                <Pressable key={prof.id} style={styles.professionalCard}>
                  <Image 
                    source={{ uri: prof.image }} 
                    style={styles.professionalImage}
                  />
                  <Text style={styles.professionalName}>{prof.name}</Text>
                  <Text style={styles.professionalSpecialty}>{prof.specialty}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Pressable style={styles.viewAllButton}>
              <Text style={styles.viewAllButtonText}>Ver todos os Profissionais</Text>
            </Pressable>
          </View>

          {/* Locais de Atendimento */}
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Locais de Atendimento</Text>
            <Text style={styles.locationAddress}>
              {professional.address}
            </Text>

            {/* Map Placeholder */}
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: professional.coordinates.latitude,
                  longitude: professional.coordinates.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: professional.coordinates.latitude,
                    longitude: professional.coordinates.longitude,
                  }}
                  title={professional.name}
                  description={professional.address}
                />
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Footer Button */}
      <View style={styles.footer}>
        <Pressable 
          style={styles.footerButton}
          onPress={() => router.push(`/minha-saude/agendamento/${id}` as any)}
        >
          <Text style={styles.footerButtonText}>Agendar Atendimento</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 8 }} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  headerExtension: {
    height: 84,
    backgroundColor: '#FFFFFF',
  },
  profileSection: {
    backgroundColor: '#EFF1F5',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#E5EAF0',
    marginTop: -60,
    marginBottom: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  clinicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01AEA4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  clinicText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    fontFamily: 'Intelo-Bold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  primaryButtonText: {
    color: '#1E2532',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  secondaryButtonText: {
    color: '#1E2532',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B6E8F',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#4A5463',
    lineHeight: 20,
    marginBottom: 12,
  },
  seeMore: {
    color: '#4576F2',
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  highlightsSection: {
    marginTop: 8,
  },
  highlightsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 12,
  },
  seeMoreContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  seeMoreLink: {
    fontSize: 14,
    color: '#6B6E8F',
    fontWeight: '600',
  },
  highlightsScroll: {
    paddingRight: 20,
    gap: 12,
  },
  highlightItem: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  highlightImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5EAF0',
  },
  // Schedule Section
  scheduleSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 16,
  },
  monthNavigator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  monthArrow: {
    padding: 8,
  },
  monthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginHorizontal: 32,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  arrowButton: {
    backgroundColor: '#4576F2',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  daysScroll: {
    flex: 1,
    marginHorizontal: 8,
  },
  dayButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6F0FF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    minWidth: 60,
  },
  dayButtonActive: {
    backgroundColor: '#4576F2',
  },
  weekDayText: {
    fontSize: 12,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  weekDayTextActive: {
    color: '#FFFFFF',
  },
  dayText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  dayTextActive: {
    color: '#FFFFFF',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  timeSlot: {
    backgroundColor: '#E6F0FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  timeSlotSelected: {
    backgroundColor: '#4576F2',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#4576F2',
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  timeSlotTextSelected: {
    color: '#FFFFFF',
  },
  viewAllButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  viewAllButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  // Services Section
  servicesSection: {
    marginTop: 20,
    
  },
  servicesSubtitle: {
    fontSize: 14,
    color: '#6B6E8F',
    marginBottom: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardSelected: {
    borderColor: '#4576F2',
    backgroundColor: '#F0F5FF',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4576F2',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4576F2',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 13,
    color: '#6B6E8F',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  // Reviews Section
  reviewsSection: {
    marginTop: 20,
    
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  totalReviews: {
    fontSize: 14,
    color: '#6B6E8F',
  },
  reviewsScroll: {
    paddingRight: 20,
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: 280,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  reviewStars: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B6E8F',
    marginBottom: 8,
  },
  reviewComment: {
    fontSize: 14,
    color: '#4A5463',
    lineHeight: 20,
  },
  // Professionals Section
  professionalsSection: {
    marginTop: 20,
    marginBottom: 20,
    
  },
  professionalsSubtitle: {
    fontSize: 14,
    color: '#6B6E8F',
    marginBottom: 16,
  },
  professionalsScroll: {
    paddingRight: 20,
    gap: 16,
  },
  professionalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 140,
  },
  professionalImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#E5EAF0',
  },
  professionalName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  professionalSpecialty: {
    fontSize: 12,
    color: '#6B6E8F',
    textAlign: 'center',
  },
  // Location Section
  locationSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  locationAddress: {
    fontSize: 14,
    color: '#6B6E8F',
    marginBottom: 16,
  },
  mapContainer: {
    marginBottom: 16,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5EAF0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scheduleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  // Fixed Footer
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5EAF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  footerButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Intelo-Bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
