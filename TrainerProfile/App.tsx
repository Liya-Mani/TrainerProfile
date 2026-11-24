import { NavigationContainer, Route, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {  Pressable, Image, StyleSheet, Text, TextInput, View } from 'react-native';

type RootStackParamList = {
  Trainer: undefined;
  Confirmed: {
    memberSend: string;
    trainerSend: string;
    priceSend: string;
  };
};

type TrainerScreenNavigationProp = 
  NativeStackNavigationProp<RootStackParamList, 'Trainer'>;

type ConfirmedScreenNavigationProp = 
  NativeStackNavigationProp<RootStackParamList, 'Confirmed'>;

  type ConfirmedScreenRouteProp = 
  NativeStackNavigationProp<RootStackParamList, 'Confirmed'>;

const Stack = createNativeStackNavigator();

function TrainerScreen({navigation} : any) {
  

  const trainerName = "Liya Mani";
  const speciality = "Plyometrics"
  const yearsExperience = 4;
  const sessionPrice = 180;
  const gymBranch = 'Walmer';
  const trainerName2 = "KSI"
  const studentNumber = "ST10012345";


  const [slotsLeft, setSlotsLeft] = useState(3);

  const [memberName, setMemberName] = useState('');
  const [booked, setBooked] = useState(false);

  console.log("App starting up");


  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <Text style={styles.stamp}>{studentNumber}</Text>  
      </View>
    
    <View style={styles.card}>

      <View style={styles.profileRow}>
        <Image source={require('./assets/Gym.png')} style={styles.photo} />
      <Text>Ironline Fitnes</Text>
      <Text>Trainer Profile</Text>
      </View>
    
      <Text style={styles.name}>{trainerName}</Text>
      <Text style={styles.chip}>{speciality}</Text>
      <View style={styles.statRow}>

          <View style={styles.tile}>
            <Ionicons name="trophy-outline" size={18} color="#211C17" />
            <Text style={styles.tileNumber}>{yearsExperience}</Text>
            <Text style={styles.tileLabel}>YEARS</Text>
          </View>
          <View style={styles.tile}>
            <Ionicons name="pricetag-outline" size={18} color="#211C17" />
            <Text style={styles.tileNumber}>R{sessionPrice}</Text>
            <Text style={styles.tileLabel}>PER SESSION</Text>
          </View>
          <View style={styles.tile}>
             <Ionicons name="calendar-outline" size={18} color="#211C17" />
            <Text style={styles.tileNumber}>{slotsLeft}</Text>
            <Text style={styles.tileLabel}>SLOTS LEFT</Text>
          </View>
        </View>

          <View style={styles.bookingBox}>

            <Text style={styles.bookingLabel}>YOUR NAME</Text>

            <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type your name"
              placeholderTextColor="#A39A8E"
              value={memberName}
              onChangeText={newText => setMemberName(newText)} 
            />
           </View>

          <Text style={styles.bookingFor}>Booking for: {memberName}</Text>
        </View>
        
           {booked && (
          <View style={styles.successRow}>
            <Ionicons name="checkmark-circle" size={16} color="#2F6B45" />
            <Text style={styles.successText}>Booking sent to the trainer</Text>
          </View>
        )}

         <Pressable 
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => {
            console.log("Booking for: " + memberName);
            setSlotsLeft(slotsLeft - 1);
            setBooked(true);
             navigation.navigate('Confirmed', {
              memberSend: memberName,
              trainerSend: trainerName,
              priceSend: sessionPrice,
            });

          }}
        >
          <Text style={styles.ctaText}>BOOK A SESSION</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          
        </Pressable>

      </View>
        <StatusBar style="auto" />
    </View>
  );
}

function ConfirmedScreen({ navigation, route } : any) {
  const memberGet = route.params.memberSend;
  const trainerGet = route.params.trainerSend;
  const priceGet = route.params.priceSend;

  return (
    <View style={styles.container}>
      <Text style={styles.confirmTitle}>You are booked in</Text>

      <View style={styles.card}>
        <View style={styles.bigTick}>
          <Ionicons name="checkmark-circle" size={56} color="#2F6B45" />
        </View>
        <Text style={styles.confirmMsg}>
          Your request has been sent. The trainer will confirm shortly.
        </Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>MEMBER</Text>
          <Text style={styles.summaryValue}>{memberGet}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>TRAINER</Text>
          <Text style={styles.summaryValue}>{trainerGet}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>PRICE</Text>
          <Text style={styles.summaryValue}>R{priceGet}</Text>
        </View>
        <Pressable style={styles.cta} onPress={() => navigation.goBack()}>
          <Text style={styles.ctaText}>BACK TO TRAINER</Text>
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}  

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#E7E0D6' },
          headerTintColor: '#211C17',
          headerTitleStyle: { fontWeight: 'bold' },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="Trainer"
          component={TrainerScreen}
          options={{ title: 'IRONLINE FITNESS' }}
        />

        <Stack.Screen
          name="Confirmed"
          component={ConfirmedScreen}
          options={{ title: 'BOOKING CONFIRMED' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E0D6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: '#E2DAD0',
    shadowColor: '#3B2F22',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
  },

  brand: {
    fontSize: 13,
    letterSpacing: 2,
    color: '#8A8A85',
  },

  price: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#101010',
    paddingTop: 16,
  },

  detail: {
    fontSize: 18,
    color: "#101010",
    paddingTop: 6,
  },

  speciality: {
    fontSize: 16,
    color: '#5A5A55',
    paddingBottom: 14,
  },

  name: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#101010',
},

stamp: {
  fontSize: 11,
  letterSpacing: 1,
  color: '#8A8A85',
},

headerRow: {
  flexDirection: 'row',
  height: 56,
  backgroundColor: '#1E1E1E',
  paddingHorizontal: 16,
  borderRadius: 14,
  marginBottom: 14,
  justifyContent: 'flex-end',
  alignItems: 'center',
},

statRow: {
  flexDirection: 'row',
  gap: 10,
  marginTop: 20,
},

tile: {
  flex: 1,
  backgroundColor: '#F5F1EA',
  padding:14,
  borderRadius: 22,
  borderWidth: 1,
  borderColor: '#E9E1D6'
},

tileNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#211C17',
  },


  tileLabel: {
    fontSize: 10,
    letterSpacing: 1,
    color: '#A39A8E',
    marginTop: 2,
  },


photo: {
  width: 96,
  height: 96,
  borderRadius: 48,
  borderWidth: 3,
  borderColor: '#8600bfbd',
},

profileRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
},

cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#211C17',
    paddingVertical: 22,
    borderRadius: 19,
    marginTop: 22,
    minHeight: 74,
  },


ctaText: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: '#FFFFFF',
  },


  bookingBox: {
    backgroundColor: '#F5F1EA',
    padding: 16,
    borderRadius: 24,
    marginTop: 22,
    borderWidth: 1,
    borderColor: '#E2DAD0',
  },
  bookingLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    color: '#A39A8E',
    marginBottom: 10,
  },


  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: '#E2DAD0',
  },

  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000000',
  },

  bookingFor: {
    fontSize: 13,
    color: '#6F665C',
    marginTop: 12,
  },

  chip: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: '#F5E02E',
    color: '#211C17',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },

  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#E8F0E6',
    borderWidth: 1,
    borderColor: '#C3D8BE',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginTop: 18,
  },
  successText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#2F6B45',
  },

  ctaPressed: {
    backgroundColor: '#4A4034',
  },

   bigTick: {
    alignItems: 'center',
    marginBottom: 12,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#211C17',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  confirmMsg: {
    fontSize: 14,
    color: '#6F665C',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F1EA',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#A39A8E',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#211C17',
  },

});
