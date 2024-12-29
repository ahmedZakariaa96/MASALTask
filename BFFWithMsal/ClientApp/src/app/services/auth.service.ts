// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import {
  AuthenticationResult,
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
// import { Client } from '@microsoft/microsoft-graph-client';
// import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';
// import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { loginRequest } from '../core/authSettings';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(
    private msalService: MsalService
  ) {

  }


  async signIn(): Promise<void> {
    debugger
    try {
       this.msalService.instance.loginRedirect(loginRequest);
    } catch (reason: any) {
      console.log(JSON.stringify(reason, null, 2))
    }
  }

   

  // Sign out
  async signOut(): Promise<void> {
    await this.msalService.logout();
  }

}
