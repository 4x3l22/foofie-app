import 'package:flutter/material.dart';


class Homer extends StatelessWidget {
  const Homer({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Column(
        children: [
          Container(
            width: double.infinity,
            height: 152,
            decoration: BoxDecoration(
              color: const Color(0xFFFF3D00),
              borderRadius: BorderRadius.circular(15),
            ),
            margin: const EdgeInsets.only(
              left: 12,
              right: 12,
              top: 23
            ),
            padding: const EdgeInsets.all(24),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'News',
                  style: TextStyle(
                    color:  Color(0xFFffffff),
                    fontSize: 25,
                    fontWeight: FontWeight.bold
                  ),
                ),
                SizedBox(height: 8.0),
                Text(
                  'Here you will find the relevant news regarding the regarding the application, the recipes and the most outstanding users of the application.',
                  style: TextStyle(
                    color:  Color(0xFFffffff),
                  )
                )
              ],
            ),
          ),
          
          Container(
            width: double.infinity,
            height: 200,
            margin: const EdgeInsets.only(
              left: 12
            ),
            padding: const EdgeInsets.only(
              top: 50
            ),
            child: const Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'News of the week',
                  style: TextStyle(
                    fontWeight: FontWeight.w200
                  )
                )
              ],
            ),
          )
        ],
      ),
    );
    
  }
}