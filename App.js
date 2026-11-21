import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

import {
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';

import { ThemeProvider, useTheme, fonts } from './theme/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import ThemeToggle from './components/ThemeToggle';

import HomeScreen from './Screen/HomeScreen';
import LogIn from './Screen/LogIn';
import Choose from './Screen/Choose';
import EnterTask from './Screen/EnterTask';
import ConfirmTask from './Screen/ConfirmTask';
import MyTask from './Screen/MyTask';
import SortedActivity from './Screen/SortedActivity';
import MenuBar from './Screen/MenuBar';
import StatusUpdate from './Screen/StatusUpdate';
import Status from './Screen/Status';
import ManageSubjects from './Screen/ManageSubjects';
import TaskList from './Screen/TaskList';

const Stack = createNativeStackNavigator();

// All screens live here.
function AppNavigator() {
  const { isDark, colors } = useTheme();
  const { user, loading } = useAuth();

  // Wait until we know if a student is already logged in.
  if (loading) {
    return null;
  }

  // Navigation theme.
  const base = isDark ? DarkTheme : DefaultTheme;

  const navigationTheme = {
    ...base,
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  // Shared look for every screen.
  const screenOptions = ({ navigation }) => ({
    headerBackVisible: false,
    headerStyle: { backgroundColor: colors.surface },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontFamily: fonts.semiBold,
      fontSize: 18,
    },
    headerShadowVisible: false,
    contentStyle: { backgroundColor: colors.background },

    headerRight: () => (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <ThemeToggle />
        <MenuBar navigation={navigation} />
      </View>
    ),
  });

  // Screens that only show the theme button.
  const themeOnly = {
    headerRight: () => <ThemeToggle />,
  };

  return (
    <NavigationContainer theme={navigationTheme}>

      <StatusBar style={isDark ? 'light' : 'dark'} />

      <Stack.Navigator
        initialRouteName={user ? 'Activity' : 'Home'}
        screenOptions={screenOptions}
      >

        <Stack.Screen name="Home" component={HomeScreen} options={themeOnly} />

        <Stack.Screen name="Start" component={LogIn} options={themeOnly} />

        <Stack.Screen name="Activity" component={Choose} />

        <Stack.Screen name="Enter Task" component={EnterTask} />

        <Stack.Screen name="Confirm Task" component={ConfirmTask} />

        <Stack.Screen name="My Tasks" component={MyTask} />

        <Stack.Screen name="Pending Tasks" component={TaskList} />

        <Stack.Screen name="Completed Tasks" component={TaskList} />

        <Stack.Screen name="Sorted Activity" component={SortedActivity} />

        <Stack.Screen name="Favorites" component={SortedActivity} />

        <Stack.Screen name="Status Update" component={StatusUpdate} />

        <Stack.Screen name="Status" component={Status} />

        <Stack.Screen name="Manage Subjects" component={ManageSubjects} />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default function App() {
  // Loads Fredoka before showing any screen.
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <TasksProvider>
          <AppNavigator />
        </TasksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}