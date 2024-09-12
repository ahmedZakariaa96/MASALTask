





import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
// import { OldAccountService } from '../services/AccountService';
import { AuthService } from '../services/auth.service';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-CompleteLogin',
  templateUrl: './CompleteLogin.component.html',
  styleUrls: ['./CompleteLogin.component.css']
})
export class CompleteLoginComponent implements OnInit {
  loginDisplay = false;
  displayedColumns: string[] = ['claim', 'value'];
  dataSource: any = [];
  weatherData:any=[];
  private readonly _destroying$ = new Subject<void>();
  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router
    ,private weatherService :WeatherService
    // , private accountService: OldAccountService
    ) { }

  ngOnInit(): void {
    // alert('fired');
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
        takeUntil(this._destroying$)
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        // alert(payload.accessToken);
        // sessionStorage.setItem("accessToken",payload.accessToken);


      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        console.log('set login display');
        debugger
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
        this.getClaims(this.authService.instance.getActiveAccount()?.idTokenClaims)
        // this.router.navigateByUrl('/home');
        this.GetWeather()
         this.getToken()
         // this.handleRedirectResponse();
        // this.accountService.completeLogin().then((result) => {
        //   if (result == true) {
        //     debugger;
        //     this.router.navigateByUrl('/home');
        //   }
        //   else {
        //     this.router.navigateByUrl('/unauthorized');
        //   }
        // }).catch(() => {

        // });;
      });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      console.log('ZIKAAAA', accounts)
      this.authService.instance.setActiveAccount(accounts[0]);

    }
  }

  setLoginDisplay() {
    debugger;
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  getClaims(claims: any) {
    this.dataSource = [
      { id: 1, claim: "Display Name", value: claims ? claims['name'] : null },
      { id: 2, claim: "User Principal Name (UPN)", value: claims ? claims['preferred_username'] : null },
      { id: 3, claim: "OID", value: claims ? claims['oid'] : null }
    ];

    console.log(claims)
    console.log(this.dataSource)

  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
//----------------------------------------
  GetWeather()
  {
    this.weatherService.GetWeather().subscribe(res=>{
      this.weatherData=res;
      console.log(res);
    },err=>{
      console.log(err);

    })
  }

 

  
  getToken()
  {
    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/.default'] // تحديد الـ scopes المطلوبة
    };
  this.authService.instance.acquireTokenSilent(tokenRequest)
    .then((tokenResponse) => {
         // تم تسجيل الدخول بنجاح
         alert("accessToken")
        alert(tokenResponse.accessToken);

      sessionStorage.setItem("accessToken",tokenResponse.accessToken);
      console.log('Access Token:', tokenResponse.accessToken); // الحصول على التوكن هنا
    })
    .catch((error) => {
      // في حالة فشل الحصول على التوكن بطريقة صامتة، يمكن استدعاء popup أو redirect
      console.error('Silent token acquisition failed. Attempting to get token via redirect/popup.', error);
  
      });
  }

  getToken1() {
    const tokenRequest = {
      scopes: ['https://graph.microsoft.com/LearningProvider.Read'] // النطاقات المطلوبة
    };
  
    this.authService.instance.acquireTokenSilent(tokenRequest)
      .then((tokenResponse) => {
        sessionStorage.setItem("accessToken", tokenResponse.accessToken);
        console.log('Access Token:', tokenResponse.accessToken);
      })
      .catch((error) => {
        console.error('Silent token acquisition failed:', error);
        // إذا فشل الحصول على التوكن بشكل صامت، يمكنك محاولة استخدام loginRedirect أو loginPopup
        this.authService.instance.acquireTokenRedirect(tokenRequest);
      });
  }

}
