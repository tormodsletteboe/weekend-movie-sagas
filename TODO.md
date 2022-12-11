[] add moviedetail View
    [x] use redux, [x] use saga
    
    [x] add a route for the movie details view
    [x] display title, image, descripion
    [x] display all genres of movie selected, prob bring this in from database so
        dispatch -> watcher - > generator -> axios get with params -> result -> redux->DOM
    [x] add back to list button
    [x] remove bad selector from file, use a prop maybe: did a array.find
    [] maybe replace the accordion with something simpler, something that shows part of the text and then allows to expand it. same as on my resume 
    [] allow refresh ie command R on this page
    [x] changed movies details path from /:id to /details/:id, think i fixed all the places that need to be fixed, in router path and image click history push
    
[X] add movie form
[X] add material ui to new movie form
[x] add material ui to homepage
[x] add delete button for movie, and corresponding routes
[x] add edit button, component and need functionality

BUGS
[] sometimes wrong movie shows up in the edit view, or no info at all
[] add fetch a single movie on on useeffect using the params.id, also fetch 
