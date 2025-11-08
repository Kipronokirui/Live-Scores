import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LeagueSection from "../../components/LeagueSection";
import LoadingSpinner from "../../components/LoadingSpinner";
import { dummyMatches } from "../../data/dummyData";

export default function FixtureScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDay = 7;

  const groupedMatches = dummyMatches.reduce((acc, match) => {
    if (!acc[match.leagueName]) {
      acc[match.leagueName] = {
        icon: match.leagueIcon,
        matches: [],
      };
    }
    acc[match.leagueName].matches.push(match);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fixture</Text>
      </View>

      <View style={styles.calendarHeader}>
        <TouchableOpacity style={styles.navButton}>
          <ChevronLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>

        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>November 2025</Text>
          <TouchableOpacity style={styles.monthButton}>
            <Text style={styles.monthButtonText}>Month</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.navButton}>
          <ChevronRight size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekContainer}>
        {daysOfWeek.map((day, index) => {
          const dayNumber = index + 2;
          const isSelected = dayNumber === currentDay;

          return (
            <TouchableOpacity
              key={index}
              style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
            >
              <Text
                style={[styles.dayName, isSelected && styles.dayNameSelected]}
              >
                {day}
              </Text>
              <Text
                style={[
                  styles.dayNumber,
                  isSelected && styles.dayNumberSelected,
                ]}
              >
                {dayNumber}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedMatches).map(([leagueName, data]) => (
          <LeagueSection
            key={leagueName}
            leagueName={leagueName}
            leagueIcon={data.icon}
            matches={data.matches}
          />
        ))}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  navButton: {
    padding: 4,
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  monthText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  monthButton: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  monthButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  dayButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dayButtonSelected: {
    backgroundColor: '#5B6FBF',
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  dayNameSelected: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  dayNumberSelected: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  bottomPadding: {
    height: 100,
  },
});