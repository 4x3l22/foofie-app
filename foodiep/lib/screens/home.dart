import 'package:flutter/material.dart';
import 'package:foodiep/screens/battle.dart';
import 'package:foodiep/screens/kitchen.dart';
import 'package:foodiep/screens/more.dart';
import 'package:foodiep/screens/social.dart';
import 'package:foodiep/screens/uno.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _selectedIndex = 0; 
  
  final List<Widget> _pages = [
    const Homer(),      
    const Social(),    
    const Kitchen(),   
    const Battle(),    
    const More(),      
  ];

  // Lista de AppBars correspondientes a cada página
  final List<PreferredSizeWidget> _appBars = [
    AppBar(
      title: const Text("Home"),
      centerTitle: true,
    ),
    AppBar(
      title: const Text("Social"),
      centerTitle: true,
    ),
    AppBar(
      title: const Text("Kitchen"),
      centerTitle: true,
    ),
    AppBar(
      title: const Text("Battle"),
      centerTitle: true,
    ),
    AppBar(
      title: const Text("More Options"),
      centerTitle: true,
    ),
  ];

  // Método que cambia el índice del ítem seleccionado
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _appBars[_selectedIndex], // Cambia el AppBar basado en el índice
      body: IndexedStack(
        index: _selectedIndex,
        children: _pages,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped, // Cambia el índice del ítem seleccionado
        selectedItemColor: Colors.black,
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.bold, // Estilo para el texto seleccionado
          color: Colors.black,
        ),
        unselectedLabelStyle: const TextStyle(
          fontWeight: FontWeight.w400, // Estilo para el texto no seleccionado
          color: Colors.grey,
        ),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home), 
            label: "Home"
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.emoji_food_beverage), 
            label: "Social"
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.kitchen), 
            label: "Kitchen"
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_dining), 
            label: "Battle"
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.more_vert), 
            label: "More"
          ),
        ],
      ),
    );
  }
}
