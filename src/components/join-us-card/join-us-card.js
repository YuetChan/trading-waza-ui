import React, { useState } from 'react';
import './join-us-card.scss';

import { MdTextsms } from 'react-icons/md'

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from '@mui/material/Typography';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import SubscribeService from '../../services/subscribe-service'

const CardState = {
	WAITING: "waiting",
	ENTER: "enter",
}

const JoinUsCard = () => {
  const [subscribeCardState, setSubscribeCardState] = useState(CardState.ENTER);
  const [phone, setPhone] = useState('');

  const [isSubscribeCardOpen, setSubscribeCardOpen] = React.useState(false);

  const handleSubscribeCardOpen = () => {
    console.log('handleSubscribeCardOpen');
    setSubscribeCardOpen(true);
  }
  const handleSubscribeCardClose = () => { 
    console.log('handleSubscribeCardClose');
    setSubscribeCardState(CardState.ENTER);
    setSubscribeCardOpen(false); 

    setPhone('');
  };

  const handleSubscribeCardSubmit = async (event) => {
    console.log('handleSubscribeCardSubmit');
    event.preventDefault();

    subscribeCardStateDecorator(async () => {
      let confirmMsg = '';

      try{
        const res = await SubscribeService.subscribeToPhoneList('1' + phone);
        
        const status = res.data.status;
        const msg = res.data.message;
        if(status === 429) {
          confirmMsg = 'Excceeded rate limit.\nPlease try again later.';
        }else if(!msg.includes('succeeded')) {
          if(msg.includes('confirmed')) {
            confirmMsg = 'Resend failed.\nAlready subscribed.'
          }else {
            confirmMsg = 'Resend failed\nOpps, something is wrong'
          }

        }else {
          setSubscribeCardState(CardState.ENTER);
          setSubscribeCardOpen(false); 
  
          handleVerifyCardOpen();
        }
  
      }catch (err) {
        confirmMsg = 'Subscribe failed.\nOpps, something is wrong.';
        console.log(err);
      }

      if(confirmMsg !== '') {
        window.confirm(confirmMsg);
      }
    });
  };

  const subscribeCardStateDecorator = func => {
    setSubscribeCardState(CardState.WAITING);
    func();
    setSubscribeCardState(CardState.ENTER);
  }


  const [verifyCardState, setVerifyCardState] = useState(CardState.ENTER);
  const [code, setCode] = React.useState('');

  const [isVerifyCardOpen, setVerifyCardOpen] = React.useState(false);

  const handleVerifyCardOpen = () => {
    console.log('handleVerifyCardOpen');
    setVerifyCardOpen(true); 
  }
  const handleVerifyCardClose = () => { 
    console.log('handleVerifyCardClose');

    setVerifyCardOpen(false);
    setPhone('');
    setCode('');
  };

  const handleResend = async () => {
    console.log('handleResendClick');
    subscribeCardStateDecorator(async () => {
      let confirmMsg = '';

      try{
        const res = await SubscribeService.subscribeToPhoneList('1' + phone);

        const status = res.data.status;
        const msg = res.data.message;
        if(status === 429) {
          confirmMsg = 'Excceeded rate limit.\nPlease try again later.';
        }else if(!msg.includes('succeeded')) {
          if(msg.includes('confirmed')) {
            confirmMsg = 'Resend failed.\nAlready subscribed.'
          }else {
            confirmMsg = 'Resend failed\nOpps, something is wrong'
          }

        }else {

        }
      }catch (err) {
        confirmMsg = 'Resend failed.\nOpps, something is wrong.';
        console.log(err);
      }

      if(confirmMsg !== '') {
        window.confirm(confirmMsg);
      }
    });
  }

  const handleVerifyCardInputChange = (event) => {
    console.log('handleVerifyCardInputChange')
    const value = event.target.value;

    const isNum = value.match(/^[0-9]+$/) != null;
    const isMaxLength = value.length > 6;
    if(isMaxLength) {
      event.target.value = code;
    }else {
      if(isNum) {
        setCode(value);
      }else {
        event.target.value = code;
      }

    }
  }

  const handleVerifyCardSubmit = async (event) => {
    console.log('handleVerifyCardSubmit');
    event.preventDefault();

    verifyCardStateDecorator(async () => {
      let confirmMsg = '';

      try{
        const res = await SubscribeService.verifyPhone('1' + phone, code)
  
        const status = res.data.status;
        if(status === 201) {
          setVerifyCardOpen(false); 
          setCode('');

          confirmMsg = 'Phone Verified';
        }else if(status === 429){
          confirmMsg = 'Excceeded rate limit.\nPlease try again later';
        }else {
          confirmMsg = 'Verification failed.\nIncorrect code/Unknown.';
        }

      }catch (err) {
        confirmMsg = 'Verification failed.\nOpps, something is wrong.';
        console.log(err);
      }

      if(confirmMsg !== '') {
        window.confirm(confirmMsg);
      }
    })
  };

  const verifyCardStateDecorator = (func) => {
    setVerifyCardState(CardState.WAITING);
    func();
    setVerifyCardState(CardState.ENTER);
  }

  return (
    <div class="join-us-card">
      <Card sx={{maxWidth: 273, textAlign: "left"}}>
        <CardMedia
          component="img"
          image="https://i.ibb.co/LkDxCyH/Screenshot-2021-10-26-21-36-19.png"
          alt="Opps"
          height="170"
        />
        
        <CardContent sx={{padding: '11px'}}>
          <div class="join-us-card__title">
            <h4>Waza SMS</h4>
            &nbsp;&nbsp;
            <div class="join-us-card__title__icon">
              <MdTextsms/>
            </div>
          </div>
          <Typography variant="body2" color="text.secondary">
            Subscribe to Waza SMS for daily update notification
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={handleSubscribeCardOpen}>SUBSCRIBE</Button>
        </CardActions>
      </Card>

      <Dialog open={isSubscribeCardOpen} onClose={handleSubscribeCardClose}>
        <form onSubmit={handleSubscribeCardSubmit}>
          <DialogTitle>Subscribe (Only available for US number)</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To subscribe to daily update notification, please enter your phone number here. 
              As soon as latest data has been processed, you will be notified through SMS.
            </DialogContentText>
            <br></br>
            <div className="join-us-card__phone-input-wrapper">
              <div className="join-us-card__phone-input-wrapper__phone-input-row">
                <PhoneInput
                  country={'us'} onlyCountries={['us']}
                  disableDropdown={true} disableCountryCode={true}
                  placeholder="(702) 123-4567"
                  value={phone} onChange={setPhone}
                />
              </div>
              &nbsp;&nbsp;&nbsp;
              <div 
                className="join-us-card__phone-input-wrapper__phone-input-row__loader" 
                hidden={subscribeCardState !== CardState.WAITING}>
                <CircularProgress size={35}/>
              </div>  
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSubscribeCardClose}>Cancel</Button>
            <Button type="submit" disabled={phone.length < 10}>Subscribe</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={isVerifyCardOpen} onClose={handleVerifyCardClose}>
        <form onSubmit={handleVerifyCardSubmit}>
          <DialogTitle>Verify Phone Number</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To verify phone number for subscription, please enter the 6-digit verification code below.
            </DialogContentText>
            <br></br>
            <div className="join-us-card__code-input-wrapper">
              <div className="join-us-card__code-input-wrapper__code-input-row">
                T- &nbsp;&nbsp;
                <input
                  onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                  }}
                  className="join-us-card__code-input-wrapper__code-input-row__code-input"
                  onChange={handleVerifyCardInputChange}
                />
              </div>
              &nbsp;&nbsp;&nbsp;
              <div 
                  className="join-us-card__code-input-wrapper__code-input-row__loader"
                  hidden={verifyCardState !== CardState.WAITING}>
                <CircularProgress size={35}/>
              </div>  
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleVerifyCardClose}>Cancel</Button>
            <Button onClick={handleResend}>Resend</Button>
            <Button type="submit" disabled={code.length < 6}>Verify</Button>
          </DialogActions>
        </form>
      </Dialog>

    </div>)
}

export default JoinUsCard;