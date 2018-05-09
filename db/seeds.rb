# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create({username:'Guest', password:'password', email:'gbphelps@aya.yale.edu'})

Note.create({title:'First Note!',body:'Hey, it\'s a note!'})
Note.create({title:'Second Note!',body:'Hey, it\'s another note!'})
Note.create({title:'Third Note',body:'You get the picture'})
Note.create({title:'I need',body:''})
Note.create({title:'At least',body:''})
Note.create({title:'A few more of these',body:''})
Note.create({title:'So that you can scroll',body:''})
