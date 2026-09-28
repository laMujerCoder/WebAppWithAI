export default async (request) => {

    const applicationId =
        process.env.BACK4APP_APPLICATION_ID;

    const restApiKey =
        process.env.BACK4APP_REST_API_KEY;

    const serverUrl =
        "https://parseapi.back4app.com";


    // Make sure the secret settings exist
    if (!applicationId || !restApiKey) {
        return new Response(
            JSON.stringify({
                error: "Back4App configuration is missing."
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }


    const headers = {
        "X-Parse-Application-Id": applicationId,
        "X-Parse-REST-API-Key": restApiKey,
        "Content-Type": "application/json"
    };


    try {

        /*
         * GET
         * Retrieve all recipes
         */
        if (request.method === "GET") {

            const response = await fetch(
                `${serverUrl}/classes/Recipe`,
                {
                    method: "GET",
                    headers: headers
                }
            );

            const data = await response.text();

            return new Response(
                data,
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }


        /*
         * POST
         * Create a new recipe
         */
        if (request.method === "POST") {

            const recipe =
                await request.json();

            const response = await fetch(
                `${serverUrl}/classes/Recipe`,
                {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(recipe)
                }
            );

            const data = await response.text();

            return new Response(
                data,
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }


        /*
         * PUT
         * Edit an existing recipe
         *
         * Example:
         * /.netlify/functions/recipes?id=abc123
         */
        if (request.method === "PUT") {

            const url =
                new URL(request.url);

            const objectId =
                url.searchParams.get("id");


            if (!objectId) {

                return new Response(
                    JSON.stringify({
                        error: "Recipe ID is required."
                    }),
                    {
                        status: 400,
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
            }


            const recipe =
                await request.json();


            const response = await fetch(
                `${serverUrl}/classes/Recipe/${objectId}`,
                {
                    method: "PUT",
                    headers: headers,
                    body: JSON.stringify(recipe)
                }
            );


            const data =
                await response.text();


            return new Response(
                data,
                {
                    status: response.status,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }


        /*
         * Anything other than GET, POST, or PUT
         */
        return new Response(
            JSON.stringify({
                error: "Method not allowed."
            }),
            {
                status: 405,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    }
    catch (error) {

        return new Response(
            JSON.stringify({
                error: "Server error.",
                details: error.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
};