# Planned coding challenge: Memory lane

## Problem definition

After a series of discovery calls we found out a problem that our users are facing. They are having a hard time sharing their memories with friends and family. They are using a combination of social media, messaging apps, and email to share their memories. They are also using a combination of cloud storage, social media, and messaging apps to store their memories. They are looking for a solution that allows them to store and share their memories in a single place.

As a first iteration for this solution, we want to build a web application that allows users to create a memory lane and share it with friends and family. A memory lane is a collection of events that happened in a chronological order. Each event consists of a title, a description, a timestamp, and at least one image.

## High level explanation of my implementation and design decisions

### Model architecture
I have 2 models: Lane and Memory, where memories belong to lanes.
- Lane
    - name
    - description
    - image
- Memory
    - lane_id
    - name
    - description
    - image
    - date

### UI/UX
The user experience is pretty simple. You have a home page with a list of lanes. You can toggle between different layouts and sort the list in different orders. You can create a new lane, edit an existing one, view more details or copy a shareable link to your clipboard. 

Once you're in the details view of a lane you can create memories for this lane by clicking a button. On the detailed page you can also view a list of memories (similar to the list of lanes). There you can change the layout and sort the memories by date. You can also edit memories, view more details or copy a shareable link. 

### Potential Improvements
Here's a list of things I would add next:

- Features
    - Users (sign in, sign out)
    - Profiles
    - Lanes scoped to users
- UI/UX redesign
    - I din't spend a lot of time on ui/ux since I prioritixzed prototyping functioning features, but if I were to spend more time on this app I would invest some time redesigning the UI to have a better navbar, proportions and more intuitive usage