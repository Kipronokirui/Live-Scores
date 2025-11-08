import { useRouter } from 'expo-router';
import { ArrowLeft, Shield } from 'lucide-react-native';
import { useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import InfoTab from '../../components/leagueDetails/InfoTab';
import MatchesTab from '../../components/leagueDetails/MatchesTab';
import StandingTab from '../../components/leagueDetails/StandingTab';
import TeamsTab from '../../components/leagueDetails/TeamsTab';
import { dummyLeagueData } from '../../data/dummyLeagueData';

export default function LeagueDetailsScreen() {
    const router = useRouter();
  const [activeTab, setActiveTab] = useState('INFO');
  const [standingFilter, setStandingFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setLoading(true);
    setActiveTab(tab);
    setTimeout(() => setLoading(false), 800);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5B6B8E" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'INFO':
        return <InfoTab dummyLeagueData={dummyLeagueData}/>;
      case 'MATCHES':
        return <MatchesTab dummyLeagueData={dummyLeagueData}/>;
      case 'STANDING':
        return (
          <StandingTab dummyLeagueData={dummyLeagueData} filter={standingFilter} setFilter={setStandingFilter} />
        );
      case 'TEAMS':
        return <TeamsTab dummyLeagueData={dummyLeagueData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Shield size={32} color="#9B4DCA" />
        <Text style={styles.headerTitle}>Premier Leagues</Text>
      </View>

      <View style={styles.tabBar}>
        {(['INFO', 'MATCHES', 'STANDING', 'TEAMS']).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => handleTabChange(tab)}>
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 12,
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#5B6B8E',
  },
  activeTabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '100%',
    backgroundColor: '#9B4DCA',
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3D4F6D',
    textAlign: 'center',
    marginVertical: 20,
    letterSpacing: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#E8EBF0',
    borderRadius: 12,
    padding: 4,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterButtonActive: {
    backgroundColor: '#5B6B8E',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  standingTable: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  standingHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
  },
  standingHeaderTeam: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  standingHeaderStat: {
    width: 50,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  standingRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    alignItems: 'center',
  },
  standingTeamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  standingPosition: {
    width: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  teamLogo: {
    width: 28,
    height: 28,
    marginHorizontal: 8,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  standingStat: {
    width: 50,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  standingPoints: {
    width: 50,
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  matchCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  matchStatus: {
    backgroundColor: '#5B6B8E',
    paddingVertical: 8,
    alignItems: 'center',
  },
  matchStatusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  matchTeam: {
    flex: 1,
    alignItems: 'center',
  },
  matchTeamLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  matchTeamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  matchScore: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3D4F6D',
  },
  matchDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  playerCard: {
    width: '48%',
    backgroundColor: '#F0F2F5',
    borderRadius: 12,
    padding: 16,
    margin: '1%',
    alignItems: 'center',
  },
  playerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  playerCountry: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5B6B8E',
    padding: 16,
  },
  infoHeaderText: {
    marginLeft: 12,
  },
  infoLeagueName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  infoTeamsCount: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 2,
  },
  infoTable: {
    padding: 16,
  },
  infoTableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
  },
  infoTableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#999',
  },
  infoTableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  infoTeamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoPosition: {
    width: 20,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  infoTeamLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  infoTeamName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  infoTableCell: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});