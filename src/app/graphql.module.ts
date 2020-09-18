import {NgModule} from '@angular/core';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache, DefaultOptions} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { environment } from '../environments/environment';

const uri = environment.graphQlUrl; // <-- add the URL of the GraphQL server here
const defaultOptions: DefaultOptions = {
  watchQuery: {
	fetchPolicy: 'no-cache',
	errorPolicy: 'ignore',
  },
  query: {
	fetchPolicy: 'no-cache',
	errorPolicy: 'all',
  },
};
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
	defaultOptions: defaultOptions
  };
}

@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
