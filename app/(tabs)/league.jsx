import { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LeagueCard from '../../components/LeagueCard';
import LoadingSpinner from "../../components/LoadingSpinner";
import { domesticLeagues, internationalLeagues } from '../../data/dummyData';

export default function LeagueScreen() {
  const [activeTab, setActiveTab] = useState(
    'international'
  );
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

  const leagues =
    activeTab === 'international' ? internationalLeagues : domesticLeagues;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>League</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'international' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('international')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'international' && styles.activeTabText,
            ]}
          >
            INTERNATIONAL
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'leagues' && styles.activeTab]}
          onPress={() => setActiveTab('leagues')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'leagues' && styles.activeTabText,
            ]}
          >
            LEAGUES
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {leagues.map((league) => (
            <LeagueCard key={league.id} league={league} />
          ))}
        </View>
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
    borderBottomColor: '#E91E63',
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
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  bottomPadding: {
    height: 100,
  },
});
