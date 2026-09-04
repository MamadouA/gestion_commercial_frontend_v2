import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
  tokens,
} from "@fluentui/react-components";
import {
  Handshake24Regular,
  HomeGarage24Regular,
  CoinMultiple20Regular,
  LockClosedKey24Regular,
  AlertOn20Regular,
  ChannelShare24Regular,
  PeopleAudience24Regular,
  Dashboard20Regular,
  BranchForkHint24Regular,
  MoneyHand24Regular,
  Organization24Regular
} from "@fluentui/react-icons";
import { useLocation, useNavigate } from "react-router";

const SideNav = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation().pathname.replace('/', '');

  return (
    <div>
      <NavDrawer open type="inline" style={{ height: "100%" }} selectedValue={currentRoute}>
        <NavDrawerBody style={{ backgroundColor: tokens.colorNeutralBackground1}}>
          <AppItem icon={<HomeGarage24Regular />}>Accueil</AppItem>

          <NavItem icon={<Dashboard20Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="dashboard" onClick={() => navigateTo('dashboard')}>
            Dashboard
          </NavItem>
          <NavItem icon={<Organization24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="tenants" onClick={() => navigateTo('tenants')}>
            Organisations
          </NavItem>
          <NavItem icon={<MoneyHand24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="subscriptions" onClick={() => navigateTo('subscriptions')}>
            Abonnements
          </NavItem>
          <NavItem icon={<PeopleAudience24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="users" onClick={() => navigateTo('users')}>
            Utilisateurs
          </NavItem>
          <NavItem icon={<LockClosedKey24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="roles" onClick={() => navigateTo('roles')}>
            Rôles et permissions
          </NavItem>
          <NavItem icon={<ChannelShare24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="clients" onClick={() => navigateTo('clients')}>
            Clients
          </NavItem>
          <NavItem icon={<BranchForkHint24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="prospections" onClick={() => navigateTo('prospections')}>
            Prospections
          </NavItem>
          <NavItem icon={<Handshake24Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="offers" onClick={() => navigateTo('offers')}>
            Offres
          </NavItem>
          <NavItem icon={<CoinMultiple20Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="projects" onClick={() => navigateTo('projects')}>
            Projets
          </NavItem>
          <NavItem icon={<AlertOn20Regular />} style={{ backgroundColor: tokens.colorNeutralBackground1}} value="notifications" onClick={() => navigateTo('notifications')}> 
            Notifications
          </NavItem>
        </NavDrawerBody>
      </NavDrawer>
    </div>
  );
};

export default SideNav;
