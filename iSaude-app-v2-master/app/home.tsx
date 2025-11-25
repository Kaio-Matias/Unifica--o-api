import React, { useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View, Linking, ImageBackground, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ReusableModal } from "../components/ui/ReusableModal";
import { ChevronRight, ArrowRight, KeyRound, Mail } from "lucide-react-native"; // Trocado IdCard por Mail
import { Link } from "../components/ui/Link";
import { NavigationProp } from "../types/navigation";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { login } from '../lib/auth'; // Importando a função de login

interface HomeScreenProps {
    navigation: NavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
    const [email, setEmail] = useState(""); // Alterado de cpfCnpj para email
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(true);
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [smsModal, setSmsModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const insets = useSafeAreaInsets();

    const algumModalAberto = Boolean(modalVisible || forgotPasswordModal || smsModal);

    const handleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const { user } = await login(email, senha);
            // Navega para a rota baseada no tipo de usuário
            switch (user.user_type) {
                case 'pacient':
                    router.replace('/(pacient)');
                    break;
                case 'professional':
                    router.replace('/(professional)');
                    break;
                case 'clinic':
                    router.replace('/(clinic)');
                    break;
                default:
                    // Fallback para uma rota padrão caso o tipo não seja reconhecido
                    router.replace('/(tabs)');
                    break;
            }
        } catch (err) {
            setError("Falha no login. Verifique suas credenciais.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToRegister = () => {
        setModalVisible(false); // Fecha o modal
        navigation.navigate('Register');
    };

    return (
        <ImageBackground source={require("../assets/home-image.png")} className={`flex-1${algumModalAberto ? ' pb-80' : ''}`}>
            <SafeAreaView className="flex-1 bg-transparent">
                <View className="flex-1 px-4 pt-10">
                    {/* Topo com imagem e logo */}
                    <View className={`flex-1 items-center justify-center${algumModalAberto ? ' pb-80' : ''}`}>
                        <Image source={require("../assets/logo-text.png")} className="w-60 h-30" resizeMode="contain" />
                    </View>
                
                </View>
                {/* Modal de Login */}
                <ReusableModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                    <Text className="text-2xl font-bold mb-1">Que bom ter você de volta!</Text>
                    <Text className="text-lg text-gray-500 mb-4">
                        Utilize suas Informações de Login para entrar na comunidade iSaúde!
                    </Text>
                    <Input
                        label="Email" // Label alterado
                        placeholder="Digite seu email aqui" // Placeholder alterado
                        value={email}
                        onChangeText={setEmail}
                        icon={<Mail size={18} color="#A0AEC0" />} // Ícone alterado
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Senha"
                        placeholder="Digite sua senha aqui"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        icon={<KeyRound size={18} color="#A0AEC0" />}
                    />
                    {error && <Text className="text-red-500 text-center my-2">{error}</Text>}
                    <View className="flex-row justify-end p-4 mb-10">
                        <Link
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate('ForgotPassword');
                            }}
                            variant="black"
                            icon={<ChevronRight size={16} color="#222" />}
                        >
                            Esqueci minha Senha!
                        </Link>
                    </View>
                    <Button onPress={handleLogin} disabled={loading} icon={loading ? <ActivityIndicator color="white" /> : <ArrowRight size={20} color="white" />}>
                        {loading ? 'Entrando...' : 'Continuar'}
                    </Button>
                    <View className="flex-row justify-center mt-4">
                        <Text className="text-center text-lg">Novo por aqui? </Text>
                        <Link onPress={handleNavigateToRegister} className="text-lg">Crie uma conta!</Link>
                    </View>
                </ReusableModal>
                {/* Botão 'Começar' só aparece se nenhum modal estiver aberto */}
                {!algumModalAberto && (
                  <Button
                    className="self-center w-10/12"
                    style={{ marginBottom: insets.bottom + 24 }}
                    onPress={() => setModalVisible(true)}
                  >
                    Começar
                  </Button>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}