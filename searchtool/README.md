Hello! Thank you for taking your time to review this. Have a great weekend! :) 
NB: node modules have all been deleted in front end

## Back end
The backend server is housed in server.js written with NodeJS, ExpressJS, and Axios.
1. The search process begins by making a get request to the api endpoint /search/[query] for a list of art piece IDs that match the search query.
2. The server takes the first 20IDs that matches the query, and begins to make another 20 get requests asynchronously to the api endpoint /objects/[objectID] for the details of each art pieces. Since there is no endpoint for retrieving an array of art piece details, the endpoint will need to be called 20 times, for 20 objects. 
3. Next, the server loops through the response in the last promise and plucks out data needed for the front end and sends the response back to the front end

If this turns into a project:
1. Handling more than 20 results: after retrieving IDs from /search on initial search, backend will continue retrieving the first 20 art piece details making 20 get requests at api endpoint /object/[objectIDs]
2. Assuming that results are shown in sets of 20, the total number of responses should be divided by 20 and sent back to front end (for page numbers)
3. If front end sends a request for search results with a page number (ie. page 2), back end will make 20 get requests for object details accordingly (ie. IDs.slice(20, 39)) to return to front end. 

## Front end
The frontend begins at App.js. This was created using create-react-app so I did not rename the file.
1. App component stores the state and all of the functions.
2. App component also houses the red container with the search bar. But the search result table and the art piece details segment are in their own component. 
3. The 20 search results are then rendered in ResultTable, with a modal that opens DetailsSegment when user wants to see more details of an art piece. Search Table appears under the search input container, and modal opens as an overlay.
4. Both ResultsTable and DetailsSegment are not rendered unless there are search results.
5. All elements are styled using styled-component. The elements are stored in Styles.js. The components are reusable across all apps by importing it into the file. This helps keep styling across the app consistent
6. The background color of the search bar component is the red #e4002b from MET website. The centered search component mimics the simplicity from google. I also used the hover colour for the buttons from MET. 

If this turns into a project:
1. searchResults in state will need to be cleared when 1) a new search query is requested for IDs, 2) when users are selecting a different page. A loader can be added in the table to indicate that app is loading. 
2. Handling more pages than just "details": react-router to handle browser history and url changes
3. Handling stored data and state management: data and ui states should be separated into different objects, and if there are different categories (such as details, ticket purchase, profile etc), they should have their own reducers respectively. 
4. UX: A search bar is kind of empty, so adding a few popular search suggestions under the search bar can make it more interesting





## Check List
1. Search Results include title, picture, link ✅
2. Show no more than 20 results ✅
3. Clicking on a result will show more details of the piece ✅
4. If user types very quickly, only one network request should be sent ✅
5. Never show results that don't match current content of result if with network latency affecting response time ✅
6. README ✅
