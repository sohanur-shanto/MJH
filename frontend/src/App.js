import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import StormScreen from './screens/StormScreen'
import LaksuraMallScreen from './screens/LaksuraMallScreen'
import FantasyScreen from './screens/FantasyScreen'
import CampaignScreen from './screens/CampaignScreen'
import AllBrandScreen from './screens/AllBrandScreen'
import VendorScreen from './screens/VendorScreen'
import OrderListScreen from './screens/OrderListScreen'
import CategoryScreen from './screens/CategoryScreen'
import TestScreen from './screens/TestScreen'
import PasswordResetScreen from './screens/PasswordResetScreen'
import PasswordResetConfirmScreen from './screens/PasswordResetConfirmScreen'
import Image_card from './components/Image_card'
import ProductCarousel from './components/ProductCarousel'



function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/storm' component={StormScreen} />
          <Route path='/laksuramall' component={LaksuraMallScreen} />
          <Route path='/fantasy' component={FantasyScreen} />
          <Route path='/campaign' component={CampaignScreen} />
          <Route path='/brands' component={AllBrandScreen} />
          <Route path='/vendor' component={VendorScreen} />
          <Route path='/orderlist' component={OrderListScreen} />
          <Route path='/category' component={CategoryScreen} />
          <Route path='/payment-verification' component={TestScreen} />
          <Route path='/reset-password' component={PasswordResetScreen} />
          <Route path='/password/confirm' component={PasswordResetConfirmScreen} /> 
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
