import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

// GET handler to find duplicate clusters
export async function GET(request: Request, { params }: { params: { productId: string } }) {
  try {
    const productId = params.productId;
    const { searchParams } = new URL(request.url);
    const similarity = searchParams.get("similarity");
    
    const snapshot = await adminDb.collection(`products/${productId}/feedbacks`).get();
    
    if (snapshot.empty) {
      return NextResponse.json({
        message: "No feedback found",
        clusters: []
      });
    }

    let clusters = [];

    if (similarity) {
      // For similarity-based clustering (you'd need to implement similarity logic)
      clusters = await findSimilarClusters(snapshot, parseInt(similarity));
    } else {
      // For exact content matching
      clusters = findIdenticalClusters(snapshot);
    }

    return NextResponse.json({
      message: `Found ${clusters.length} duplicate clusters`,
      clusters,
      totalDuplicates: clusters.reduce((sum, cluster) => sum + (cluster.length - 1), 0)
    });
    
  } catch (error) {
    console.error("Error finding duplicates:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      error: error.message 
    }, { status: 500 });
  }
}

// DELETE handler to remove duplicates with Firestore batch
export async function DELETE(request, { params }) {
  try {
    const productId = params.productId;
    const body = await request.json();
    const { clusters } = body;
    
    if (!clusters || clusters.length === 0) {
      return NextResponse.json({ 
        message: "No clusters provided for deletion",
        deleted: []
      });
    }

    const batch = adminDb.batch();
    const deletedIds = [];

    // clusters should be an array of arrays containing document IDs to delete
    // e.g., [["id1", "id2"], ["id3", "id4", "id5"]]
    for (const cluster of clusters) {
      for (const docId of cluster) {
        const docRef = adminDb.doc(`products/${productId}/feedbacks/${docId}`);
        batch.delete(docRef);
        deletedIds.push(docId);
      }
    }

    await batch.commit();

    return NextResponse.json({
      message: `Successfully deleted ${deletedIds.length} duplicate feedback items`,
      deleted: deletedIds,
      clustersProcessed: clusters.length
    });
    
  } catch (error) {
    console.error("Error deleting duplicates:", error);
    return NextResponse.json({ 
      message: "Internal server error", 
      error: error.message 
    }, { status: 500 });
  }
}

// Helper function to find identical content clusters
function findIdenticalClusters(snapshot) {
  const contentMap = {};
  
  // Group documents by identical content
  snapshot.forEach(doc => {
    const data = doc.data();
    const content = data.content?.trim();
    
    if (!content) return; // Skip empty content
    
    if (!contentMap[content]) {
      contentMap[content] = [];
    }
    
    contentMap[content].push({
      id: doc.id,
      data: data
    });
  });

  // Return only groups with more than 1 item (duplicates)
  return Object.values(contentMap)
    .filter(group => group.length > 1)
    .sort((a, b) => b.length - a.length); // Sort by cluster size, largest first
}

// Helper function for similarity-based clustering
async function findSimilarClusters(snapshot, similarityThreshold) {
  const feedbackItems = [];
  
  snapshot.forEach(doc => {
    const data = doc.data();
    if (data.content?.trim()) {
      feedbackItems.push({
        id: doc.id,
        data: data,
        content: data.content.trim().toLowerCase()
      });
    }
  });

  const clusters = [];
  const processed = new Set();

  for (let i = 0; i < feedbackItems.length; i++) {
    if (processed.has(feedbackItems[i].id)) continue;

    const cluster = [feedbackItems[i]];
    processed.add(feedbackItems[i].id);

    for (let j = i + 1; j < feedbackItems.length; j++) {
      if (processed.has(feedbackItems[j].id)) continue;

      const similarity = calculateSimilarity(
        feedbackItems[i].content,
        feedbackItems[j].content
      );

      if (similarity >= similarityThreshold) {
        cluster.push(feedbackItems[j]);
        processed.add(feedbackItems[j].id);
      }
    }

    if (cluster.length > 1) {
      clusters.push(cluster);
    }
  }

  return clusters.sort((a, b) => b.length - a.length);
}

// Simple similarity calculation (you might want to use a more sophisticated algorithm)
function calculateSimilarity(str1, str2) {
  if (str1 === str2) return 100;
  
  // Simple Levenshtein distance based similarity
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 100;
  
  const distance = levenshteinDistance(longer, shorter);
  const similarity = ((longer.length - distance) / longer.length) * 100;
  
  return Math.round(similarity);
}

function levenshteinDistance(str1, str2) {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}