import { Search } from 'lucide-react-native';
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

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('scores');
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

  const liveMatches = dummyMatches.filter(
    (m) => m.status === 'First Half' || m.status === 'Second Half'
  );
  const groupedLiveMatches = liveMatches.reduce((acc, match) => {
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
        <Text style={styles.logo}>
          LIVE<Text style={styles.logoRed}>FOOTBALL</Text>
        </Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'scores' && styles.activeTab]}
          onPress={() => setActiveTab('scores')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'scores' && styles.activeTabText,
            ]}
          >
            ALL SCORES
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'lives' && styles.activeTab]}
          onPress={() => setActiveTab('lives')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'lives' && styles.activeTabText,
            ]}
          >
            ALL LIVES
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todayHeader}>
        <View style={styles.todayLine} />
        <Text style={styles.todayText}>TODAY</Text>
        <View style={styles.todayLine} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'scores' &&
          Object.entries(groupedMatches).map(([leagueName, data]) => (
            <LeagueSection
              key={leagueName}
              leagueName={leagueName}
              leagueIcon={data.icon}
              matches={data.matches}
            />
          ))}

        {activeTab === 'lives' &&
          Object.entries(groupedLiveMatches).map(([leagueName, data]) => (
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  logoRed: {
    color: '#E53935',
  },
  searchButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: '#1A1A1A',
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  todayLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#CBD5E0',
  },
  todayText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4A5568',
    marginHorizontal: 16,
  },
  content: {
    flex: 1,
  },
  bottomPadding: {
    height: 100,
  },
});
