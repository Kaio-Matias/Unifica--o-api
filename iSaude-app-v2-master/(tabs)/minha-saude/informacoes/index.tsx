import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InformacoesScreen() {
  // Estados para os campos do formulário
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [pressaoSistolica, setPressaoSistolica] = useState('');
  const [pressaoDiastolica, setPressaoDiastolica] = useState('');
  const [doencaCronica, setDoencaCronica] = useState('Não');
  const [qualDoenca, setQualDoenca] = useState('');
  const [alergia, setAlergia] = useState('Não');
  const [qualAlergia, setQualAlergia] = useState('');
  const [cirurgia, setCirurgia] = useState('Não');
  const [qualCirurgia, setQualCirurgia] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E2532" />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Informações de Saúde</Text>
      </View>
      
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        {/* Dados Básicos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados Básicos</Text>
          <Text style={styles.sectionDescription}>
            Mantenha seus dados atualizados para garantir um atendimento mais eficaz.
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Qual sua Altura?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ex. 1,75"
                value={altura}
                onChangeText={setAltura}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Qual seu Peso?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ex. 70"
                value={peso}
                onChangeText={setPeso}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Qual sua Pressão Arterial média?</Text>
            <View style={styles.pressaoContainer}>
              <View style={styles.pressaoInputContainer}>
                <TextInput
                  style={styles.pressaoInput}
                  placeholder="12"
                  placeholderTextColor="#C7C7CC"
                  value={pressaoSistolica}
                  onChangeText={setPressaoSistolica}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
              <Text style={styles.pressaoSeparator}>/</Text>
              <View style={styles.pressaoInputContainer}>
                <TextInput
                  style={styles.pressaoInput}
                  placeholder="08"
                  placeholderTextColor="#C7C7CC"
                  value={pressaoDiastolica}
                  onChangeText={setPressaoDiastolica}
                  keyboardType="numeric"
                  maxLength={3}
                />
              </View>
              <Text style={styles.unit}>mmHg</Text>
            </View>
          </View>
        </View>

        {/* Section Divider */}
        <View style={styles.sectionDivider} />

        {/* Doenças Crônicas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Doenças Crônicas</Text>
          <Text style={styles.sectionDescription}>
            Forneça informações sobre doenças crônicas que você possui, como diabetes, hipertensão, entre outras...
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Você possui alguma doença crônica?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={doencaCronica}
                onValueChange={(itemValue) => setDoencaCronica(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
              </Picker>
            </View>
          </View>

          {doencaCronica === 'Sim' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quais?</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>
                  {qualDoenca || 'Diabetes'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
              <Text style={styles.helperText}>É opcional adicionar mais de uma doença</Text>
            </View>
          )}
        </View>

        {/* Section Divider */}
        <View style={styles.sectionDivider} />

        {/* Alergias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alergias</Text>
          <Text style={styles.sectionDescription}>
            Forneça informações sobre alergias que você possui, como alergias alimentares, medicamentosas, entre outras...
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Você possui alguma alergia?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={alergia}
                onValueChange={(itemValue) => setAlergia(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
              </Picker>
            </View>
          </View>

          {alergia === 'Sim' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quais?</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>
                  {qualAlergia || 'Glútem'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
              <Text style={styles.helperText}>É opcional adicionar mais de uma alergia</Text>
            </View>
          )}
        </View>

        {/* Section Divider */}
        <View style={styles.sectionDivider} />

        {/* Cirurgias */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cirurgias</Text>
          <Text style={styles.sectionDescription}>
            Forneça informações sobre cirurgias que você realizou, como cirurgias cardíacas, ortopédicas, entre outras...
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Você já realizou alguma cirurgia?</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={cirurgia}
                onValueChange={(itemValue) => setCirurgia(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Sim" value="Sim" />
                <Picker.Item label="Não" value="Não" />
              </Picker>
            </View>
          </View>

          {cirurgia === 'Sim' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Quais?</Text>
              <TouchableOpacity style={styles.selectButton}>
                <Text style={styles.selectButtonText}>
                  {qualCirurgia || 'Cirurgia'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
              <Text style={styles.helperText}>É opcional adicionar mais de uma cirurgia</Text>
            </View>
          )}
        </View>

        {/* Section Divider */}
        <View style={styles.sectionDivider} />
      </ScrollView>

      {/* Footer com Botão Salvar */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Informações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginLeft: 16,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 13,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    lineHeight: 18,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
    paddingBottom: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  unit: {
    fontSize: 14,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    marginLeft: 8,
  },
  pressaoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pressaoInputContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  pressaoInputWrapper: {
    flex: 1,
  },
  pressaoInput: {
    paddingVertical: 12,
    fontSize: 14,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
    textAlign: 'center',
  },
  pressaoSeparator: {
    fontSize: 14,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5EAF0',
  },
  selectButtonText: {
    fontSize: 15,
    color: '#1E2532',
    fontFamily: 'Intelo-Bold',
  },
  helperText: {
    fontSize: 12,
    color: '#6B7480',
    fontFamily: 'Intelo-Bold',
    marginTop: 6,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5EAF0',
  },
  saveButton: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Intelo-Bold',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#D8DCE5',
    marginVertical: 24,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5EAF0',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    color: '#1E2532',
  },
});