# Welcome to React Posts Monitor

The purpose of this project is to fetch a certain number of random posts from a mock GraphQL API, filter through
them, and create a histogram displaying the filtered information.


# Histogram contents

The histogram contains information for a month by month bases.

Each month graph contains information about the number of posts (represented by the, turquoise color? is that what that color is?), and the combined likelihood of all the topics contained
in these posts (represented by the color green).

# Application mechanism

The application has a crude error handling and loading mechanism, the error handling system presenting a reload option when the data retrival
fails.

# MISC
I've added a timeout for when the data is set to the state, so that we can simulate a low performance network or machine and as
such, be able to see the loading mechanism for a brief time.

I've also complicated the retrieval of the data from the mock GraphQL API by calling for a big chunk of data instead of exactly what I needed, so that later on I have more data to process and play with so that
I can use some algorithms to do some extra data manipulation.

The biggest challenge for this project was using technologies that I've never used before (GraphQL, Apollo, VX) 
